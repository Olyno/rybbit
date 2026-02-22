import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { admin, captcha, emailOTP, organization, apiKey } from "better-auth/plugins";
import dotenv from "dotenv";
import { asc, eq } from "drizzle-orm";
import pg from "pg";

import { db } from "../db/postgres/postgres.js";
import * as schema from "../db/postgres/schema.js";
import { user } from "../db/postgres/schema.js";
import { DISABLE_SIGNUP, IS_CLOUD } from "./const.js";
import { sendInvitationEmail, sendOtpEmail, sendWelcomeEmail } from "./email/email.js";

dotenv.config();

const pluginList = [
  admin(),
  apiKey(),
  organization({
    // Allow users to create organizations
    allowUserToCreateOrganization: true,
    // Set the creator role to owner
    creatorRole: "owner",
    sendInvitationEmail: async invitation => {
      const inviteLink = `${process.env.BASE_URL}/invitation?invitationId=${invitation.invitation.id}&organization=${invitation.organization.name}&inviterEmail=${invitation.inviter.user.email}`;
      await sendInvitationEmail(
        invitation.email,
        invitation.inviter.user.email,
        invitation.organization.name,
        inviteLink
      );
    },
  }),
  emailOTP({
    async sendVerificationOTP({ email, otp, type }) {
      await sendOtpEmail(email, otp, type);
    },
  }),
  // Add Cloudflare Turnstile captcha (cloud only)
  ...(IS_CLOUD && process.env.TURNSTILE_SECRET_KEY && process.env.NODE_ENV === "production"
    ? [
        captcha({
          provider: "cloudflare-turnstile",
          secretKey: process.env.TURNSTILE_SECRET_KEY,
        }),
      ]
    : []),
];

// Validate base URL is configured
const baseURL = process.env.BETTER_AUTH_URL || process.env.BASE_URL;
if (!baseURL) {
  throw new Error(
    "Missing required environment variable: BETTER_AUTH_URL or BASE_URL must be set for authentication"
  );
}

export const auth = betterAuth({
  basePath: "/api/auth",
  baseURL,
  database: new pg.Pool({
    host: process.env.POSTGRES_HOST || "postgres",
    port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  }),
  emailAndPassword: {
    enabled: true,
    // Disable email verification for now
    requireEmailVerification: false,
    disableSignUp: DISABLE_SIGNUP,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  user: {
    additionalFields: {
      sendAutoEmailReports: {
        type: "boolean",
        required: true,
        defaultValue: true,
        input: true,
      },
    },
    deleteUser: {
      enabled: true,
    },
    changeEmail: {
      enabled: true,
    },
  },
  plugins: pluginList,
  trustedOrigins: [
    "http://localhost:3002",
    baseURL,
  ],
  trustHost: process.env.AUTH_TRUST_HOST === "true",
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production", // don't mark Secure in dev
    defaultCookieAttributes: {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async () => {
          const users = await db.select().from(schema.user).orderBy(asc(user.createdAt));

          // If this is the first user, make them an admin
          if (users.length === 1) {
            await db.update(user).set({ role: "admin" }).where(eq(user.id, users[0].id));
          }
        },
      },
      update: {
        before: async userUpdate => {
          // Security: Prevent role field from being updated via regular update-user endpoint
          // Role changes should only go through the admin setRole endpoint
          if (userUpdate && typeof userUpdate === "object") {
            if ("role" in userUpdate) {
              // Remove role from the update data
              const { role: _, ...dataWithoutRole } = userUpdate;
              return {
                data: dataWithoutRole,
              };
            }
            // Always return the data, even if role wasn't present
            return {
              data: userUpdate,
            };
          }
        },
      },
    },
  },
  hooks: {
    after: createAuthMiddleware(async ctx => {
      if (ctx.path.startsWith("/sign-up") && IS_CLOUD) {
        const newSession = ctx.context.newSession;
        if (newSession) {
          sendWelcomeEmail(newSession.user.email, newSession.user.name);
        }
      }
    }),
  },
});
