import * as bcrypt from "bcrypt";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { signUpSchema } from "~/common/validation/auth";

export const authRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password, confirmPassword } = input;
      if (password !== confirmPassword)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "The passwords entered do not match.",
        });

      const existingUser = await ctx.prisma.user.findFirst({
        where: { email },
      });

      // TODO handle this in a secure way that can't be used to enumerate registered users
      if (existingUser)
        throw new TRPCError({
          code: "CONFLICT",
          message: "User with that email address already exists.",
        });
      const hashedPassword: string = await bcrypt.hash(password, 10);
      const createdUser = await ctx.prisma.user.create({
        data: {
          hashed_password: hashedPassword,
          about: "",
          dob_day: 1,
          dob_month: 1,
          dob_year: 1000,
          email: input.email,
          first_name: "",
          gender_identity: "",
          gender_interest: "",
          show_gender: false,
          profile_image: "",
        },
      });
      return createdUser;
    }),
});
