import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { loginSchema } from "~/common/validation/auth";
import { prisma } from "~/server/db";
import * as bcrypt from "bcrypt";
import {
  type DefaultSession,
  type NextAuthOptions,
  getServerSession,
} from "next-auth";
import type { GetServerSidePropsContext } from "next";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const compareHashAsyc = (plaintextPassword: string, hash: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plaintextPassword, hash, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "Email Address",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const creds = await loginSchema.parseAsync(credentials);
        const user = await prisma.user.findFirst({
          where: { email: creds.email },
        });
        if (!user) return null;
        const isValidPassword = await compareHashAsyc(
          creds.password,
          user.hashed_password
        );
        if (!isValidPassword) return null;
        return {
          id: user.user_id,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        (token.id = user.id), (token.email = user.email);
      }

      return token;
    },
    session: ({ session, user }) => ({
      ...session,
      user: { ...session.user, id: user.id },
    }),
  },
  adapter: PrismaAdapter(prisma),
  jwt: {
    maxAge: 15 * 24 * 30 * 60,
  },
  pages: {
    signIn: "/",
    newUser: "/onboarding",
  },
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => getServerSession(ctx.req, ctx.res, authOptions);
