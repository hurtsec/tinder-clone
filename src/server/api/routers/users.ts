import type { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  GenderIdentityEnum,
  GenderInterestEnum,
  UserOnboarding,
} from "~/common/validation/user";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  whoAmI: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: { id: ctx.session.user.id },
    });
    if (!user)
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
    return user;
  }),
  get: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({ where: { id: input.id } });
      return user;
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany();
    return {
      users,
    };
  }),
  getByGenderInterests: protectedProcedure.query(async ({ ctx, input }) => {
    const whoAmI = await ctx.prisma.user.findFirst({
      where: { id: ctx.session.user.id },
    });

    if (!whoAmI)
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });

    const { gender_identity, gender_interest } = whoAmI;

    if (!gender_identity || !gender_interest)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User has not completed onboarding.",
      });

    const genderSought: Prisma.UserWhereInput = {};
    if (gender_interest !== GenderInterestEnum.enum.everyone) {
      genderSought.gender_identity =
        gender_interest === GenderInterestEnum.enum.men
          ? GenderIdentityEnum.enum.man
          : GenderIdentityEnum.enum.woman;
    }

    const genderIdentityToInterest: { gender_interest?: string }[] = [
      { gender_interest: GenderInterestEnum.enum.everyone },
    ];
    if (gender_identity !== GenderIdentityEnum.enum.nonbinary)
      genderIdentityToInterest.push({
        gender_interest:
          gender_identity === GenderIdentityEnum.enum.man
            ? GenderInterestEnum.enum.men
            : GenderInterestEnum.enum.women,
      });
    const othersGenderInterest: Prisma.UserWhereInput = {
      OR: genderIdentityToInterest,
    };

    const genderInterestsOverlapQuery = {
      ...othersGenderInterest,
      AND: genderSought,
    };

    const usersGenderInterestsOverlap = await ctx.prisma.user.findMany({
      where: genderInterestsOverlapQuery,
    });
    return usersGenderInterestsOverlap;
  }),
  onboard: protectedProcedure
    .input(UserOnboarding)
    .mutation(async ({ ctx, input }) => {
      const { id: currentUserId } = ctx.session.user;

      const updatedUser = await ctx.prisma.user.update({
        where: { id: currentUserId },
        data: { ...input, onboarding_completed: true },
      });

      return updatedUser;
    }),
});
