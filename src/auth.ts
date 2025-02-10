import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/../prisma/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { username, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            username: username as string,
          },
        });

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        const passwordMatch = await bcrypt.compare(
          password as string,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Invalid credentials.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // when user logs in, user object will be present, lets add required information to the session.
        token.id = user.id;
        token.username = user.username;
        token.displayName = user.displayName;
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.displayName = token.displayName;
      session.user.image = token.image;

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
