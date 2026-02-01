import { randomBytes } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../../db/postgres/postgres.js";
import { sites } from "../../db/postgres/schema.js";

export async function addSite(
  request: FastifyRequest<{
    Params: {
      organizationId: string;
    };
    Body: {
      domain: string;
      name: string;
      public?: boolean;
      saltUserIds?: boolean;
      blockBots?: boolean;
    };
  }>,
  reply: FastifyReply
) {
  const { organizationId } = request.params;
  const { domain, name, public: isPublic, saltUserIds, blockBots } = request.body;

  // Validate domain format using regex
  const domainRegex = /^(?:[\p{L}\p{N}](?:[\p{L}\p{N}-]{0,61}[\p{L}\p{N}])?\.)+\p{L}{2,}$/u;
  if (!domainRegex.test(domain)) {
    return reply.status(400).send({
      error: "Invalid domain format. Must be a valid domain like example.com or sub.example.com",
    });
  }

  try {
    // Auth and org admin check handled by requireOrgAdminFromBody middleware
    const userId = request.user?.id;

    // Generate a random 12-character hex ID
    const id = randomBytes(6).toString("hex");

    // Create the new site
    const newSite = await db
      .insert(sites)
      .values({
        id,
        domain,
        name,
        createdBy: userId,
        organizationId,
        public: isPublic || false,
        saltUserIds: saltUserIds || false,
        blockBots: blockBots === undefined ? true : blockBots,
      })
      .returning();

    return reply.status(201).send(newSite[0]);
  } catch (error) {
    console.error("Error adding site:", error);
    return reply.status(500).send({
      error: "Internal server error",
    });
  }
}
