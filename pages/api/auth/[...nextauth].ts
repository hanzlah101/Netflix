import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GithubCredentials from "next-auth/providers/github";
import GoogleCredentials from "next-auth/providers/google";
import prisma from "@/libs/prisma";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export default NextAuth({
  providers: [
    GithubCredentials({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),

    GoogleCredentials({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", text: "text" },
        password: { label: "Password", text: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("User doesn't exist");
        }

        const isPasswordCorrect = await compare(
          credentials?.password,
          user?.hashedPassword
        );

        if (!isPasswordCorrect) {
          throw new Error("Incorrect Password");
        }

        return user;
      },
    }),
  ],

  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  debug: process.env.NODE_ENV === "development" ? true : false,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
