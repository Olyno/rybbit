import { and, eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../../db/postgres/postgres.js";
import { member, user } from "../../db/postgres/schema.js";
import { randomBytes } from "crypto";
import { getIsUserAdmin } from "../../lib/auth-utils.js";

const addUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  role: z.enum(["admin", "member", "owner"]),
});

function generateId(len = 32) {
  const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const bytes = randomBytes(len);
  let id = "";
  for (let i = 0; i < len; i++) {
    id += alphabet[bytes[i] % alphabet.length];
  }
  return id;
}

interface AddUserToOrganization {
  Params: {
    organizationId: string;
  };
  Body: {
    email: string;
    role: string;
  };
}

export async function addUserToOrganization(request: FastifyRequest<AddUserToOrganization>, reply: FastifyReply) {
  try {
    const { organizationId } = request.params;
    const userId = request.user?.id;

    // Validate input
    const validation = addUserSchema.safeParse(request.body);
    if (!validation.success) {
      return reply.status(400).send({
        error: validation.success ? "Invalid input" : validation.error.errors[0].message,
      });
    }
    const { email, role } = validation.data;

    const isAdmin = await getIsUserAdmin(request);

    if (!isAdmin) {
      if (!userId) {
        return reply.status(401).send({ error: "Unauthorized" });
      }
      const userMembership = await db.query.member.findFirst({
        where: and(eq(member.userId, userId), eq(member.organizationId, organizationId)),
      });
      if (!userMembership || (userMembership.role !== "admin" && userMembership.role !== "owner")) {
        return reply.status(401).send({ error: "Unauthorized" });
      }
    }



    const foundUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (!foundUser) {
      return reply.status(404).send({ error: "User not found" });
    }

    // Check if user is already a member of this specific organization
    const existingMember = await db.query.member.findFirst({
      where: and(eq(member.userId, foundUser.id), eq(member.organizationId, organizationId)),
    });

    if (existingMember) {
      return reply.status(400).send({ error: "User is already a member of this organization" });
    }

    await db.insert(member).values([
      {
        userId: foundUser.id,
        organizationId: organizationId,
        role: role,
        id: generateId(),
        createdAt: new Date().toISOString(),
      },
    ]);

    return reply.status(201).send({
      message: "User added to organization successfully",
    });
  } catch (error: any) {
    console.error(String(error));
    return reply.status(500).send({ error: String(error) });
  }
}
