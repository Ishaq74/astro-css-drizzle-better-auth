import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDrizzle } from "@database/drizzle";
import { username } from "better-auth/plugins/username";
import { organization } from "better-auth/plugins";
import { ac, roles } from "./permissions";
import { sendEmail } from "@lib/smtp/smtp.send";

export async function getAuth() {
  const db = await getDrizzle();
  const instance = betterAuth({
    database: drizzleAdapter(db, { provider: "pg" }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      async sendResetPassword({ user, url, token }) {
        await sendEmail({
          to: user.email,
          subject: "Réinitialisation de votre mot de passe",
          text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${url}`,
        });
      },
    },
    emailVerification: {
      sendVerificationEmail: async ({ user, url }) => {
        try {
          const result = await sendEmail({
            to: user.email,
            subject: "Vérifiez votre adresse email",
            text: `Veuillez vérifier votre adresse email en cliquant sur ce lien: ${url}`,
          });
          if (!result || result.success === false) {
            console.error("sendVerificationEmail failed:", result);
            return;
          }
        } catch (err) {
          console.error("sendVerificationEmail error:", err);
          return;
        }
      },
      sendOnSignUp: true,
    },
    plugins: [
      username(),
      organization({
        ac,
        roles,
        allowUserToCreateOrganization: async (user) => true, // Personnaliser selon le business
        async sendInvitationEmail(data) {
          await sendEmail({
            to: data.email,
            subject: `Invitation à rejoindre ${data.organization.name}`,
            text: `Cliquez ici pour rejoindre : ${process.env.BETTER_AUTH_URL}/invite/${data.id}`,
          });
        },
      }),
      // Ajouter ici d'autres plugins si besoin (socialProviders, magicLink, etc.)
    ],
    advanced: {
      useSecureCookies: true,
      disableCSRFCheck: false,
      disableOriginCheck: false,
      trustedOrigins: [process.env.BETTER_AUTH_URL],
      cookies: {
        attributes: {
          // sameSite: "lax",
          // secure: true,
          // httpOnly: true,
        }
      },
      cookiePrefix: "astro_",
      crossSubDomainCookies: { enabled: false },
      ipAddress: {
        ipAddressHeaders: ["x-real-ip", "x-forwarded-for", "cf-connecting-ip"],
        disableIpTracking: false,
      },
      onError: (error: any, ctx: any) => {
        // Centraliser la gestion des erreurs API
        console.error("Better Auth API Error:", error);
      },
    },
    rateLimit: {
      enabled: true,
      // rules: [
      //   { window: 60, max: 10 },
      // ],
      storage: "database",
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 jours
      updateAge: 60 * 60 * 24, // 1 jour
      cookieCache: {
        enabled: true,
        strategy: "compact",
        maxAge: 60 * 5, // 5 min
      },
      freshAge: 60 * 10, // 10 min
    },
    databaseHooks: {
      user: {
        create: {
          after: async (user, ctx) => {
            // Audit log, send welcome email, etc.
            // await sendWelcomeEmail(user.email);
          },
        },
      },
      session: {
        create: {
          after: async (session, ctx) => {
            // Track session creation
          },
        },
      },
    },
    // onAPIError: (err: any, ctx: any) => {
    //   // Centraliser la gestion des erreurs API
    //   console.error("Better Auth API Error:", err);
    // },
    telemetry: {
      enabled: false,
      debug: false,
    },
  });
  // Expose organization endpoints for easier usage
  (instance as any).organizationApi = {
    create: (payload: any) => (instance.api as any)["organization/create"](payload),
    setActive: (payload: any) => (instance.api as any)["organization/set-active"](payload),
    update: (payload: any) => (instance.api as any)["organization/update"](payload),
    delete: (payload: any) => (instance.api as any)["organization/delete"](payload),
    inviteMember: (payload: any) => (instance.api as any)["organization/invite-member"](payload),
    updateMemberRole: (payload: any) => (instance.api as any)["organization/update-member-role"](payload),
    removeMember: (payload: any) => (instance.api as any)["organization/remove-member"](payload),
    leave: (payload: any) => (instance.api as any)["organization/leave"](payload),
    list: (payload: any) => (instance.api as any)["organization/list"](payload),
    getFull: (payload: any) => (instance.api as any)["organization/get-full-organization"](payload),
    listMembers: (payload: any) => (instance.api as any)["organization/list-members"](payload),
    listUserInvitations: (payload: any) => (instance.api as any)["organization/list-user-invitations"](payload),
  };
  return instance;
}

// Instance pour le CLI (sync, sans await)
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "@database/schemas";
import { drizzleAdapter as drizzleAdapterSync } from "better-auth/adapters/drizzle";

const url = process.env.DATABASE_URL
  || (process.env.USE_PROD_DB === 'true'
    ? process.env.DATABASE_URL_PROD
    : process.env.DATABASE_URL_LOCAL);

let auth;
if (url) {
  const client = new Client({ connectionString: url });
  // On ne connecte pas, juste pour le CLI
  const db = drizzle(client, { schema });
  auth = betterAuth({
    database: drizzleAdapterSync(db, { provider: "pg" }),
    emailAndPassword: {
      enabled: true,
    },
    plugins: [
      username()
    ]
  });
}

export { auth };
export default auth;