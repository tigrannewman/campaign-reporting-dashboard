import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authenticateWithCognito } from "@/lib/cognito";
import authConfig from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        try {
          return await authenticateWithCognito(email, password);
        } catch (err) {
          console.error("Cognito authentication failed:", err);
          return null;
        }
      },
    }),
  ],
});
