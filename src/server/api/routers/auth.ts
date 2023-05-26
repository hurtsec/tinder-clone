import { z } from "zod";
import * as bcrypt from "bcrypt";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        confirmPassword: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const hashedPassword: string = await bcrypt.hash(input.password, 10);
      const existingUser = await ctx.prisma.user.findFirst({
        where: { email: input.email },
      });

      // TODO handle this in a secure way that can't be used to enumerate registered users
      if (existingUser)
        throw new TRPCError({
          code: "CONFLICT",
          message: "User with that email address already exists.",
        });
      const userCreated = await ctx.prisma.user.create({
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
      return {
        greeting: `Hello ${input.email}`,
      };
    }),
});
