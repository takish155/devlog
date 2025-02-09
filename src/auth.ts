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
  session: {
    strategy: "jwt",
  },
});
