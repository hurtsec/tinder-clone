import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import type { Gender_Interest, Prisma } from "@prisma/client";
import {
  GenderIdentityEnum,
  GenderInterestEnum,
} from "~/common/validation/user";

export const matchRouter = createTRPCRouter({
  whoLikesMe: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const whoLikesMe = await ctx.prisma.user.findMany({
        where: { likes: { some: { id: input.id } } },
      });
      return whoLikesMe.map((user) => user.id);
    }),
  getPotentialMatches: protectedProcedure.query(async ({ ctx }) => {
    const whoAmI = await ctx.prisma.user.findFirst({
      where: { id: ctx.session.user.id },
      include: {
        likes: { select: { id: true } },
        dislikes: { select: { id: true } },
      },
    });

    if (!whoAmI)
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });

    const { gender_identity, gender_interest, likes, dislikes } = whoAmI;

    if (!gender_identity || !gender_interest)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User has not completed onboarding.",
      });

    const genderSought: Prisma.UserWhereInput = {};
    if (gender_interest !== GenderInterestEnum.enum.EVERYONE) {
      genderSought.gender_identity =
        gender_interest === GenderInterestEnum.enum.MEN
          ? GenderIdentityEnum.enum.MAN
          : GenderIdentityEnum.enum.WOMAN;
    }

    const genderIdentityToInterest: { gender_interest?: Gender_Interest }[] = [
      { gender_interest: GenderInterestEnum.enum.EVERYONE },
    ];
    if (gender_identity !== GenderIdentityEnum.enum.NONBINARY)
      genderIdentityToInterest.push({
        gender_interest:
          gender_identity === GenderIdentityEnum.enum.MAN
            ? GenderInterestEnum.enum.MEN
            : GenderInterestEnum.enum.WOMEN,
      });
    const othersGenderInterest: Prisma.UserWhereInput = {
      OR: genderIdentityToInterest,
    };

    const usersGenderInterestsOverlap = await ctx.prisma.user.findMany({
      where: {
        ...othersGenderInterest,
        AND: [
          genderSought,
          { id: { notIn: likes.map((user) => user.id) } },
          { id: { notIn: dislikes.map((user) => user.id) } },
        ],
      },
    });
    return usersGenderInterestsOverlap;
  }),
  getMatches: protectedProcedure.query(async ({ ctx }) => {
    const { id: currentUserId } = ctx.session.user;
    const matches = await ctx.prisma.user.findMany({
      where: {
        likedBy: { some: { id: currentUserId } },
        AND: [{ likes: { some: { id: currentUserId } } }],
      },
    });
    return matches;
  }),
  newLike: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const { id: currentUserId } = ctx.session.user;

      const updatedUser = await ctx.prisma.user.update({
        where: { id: currentUserId },
        data: { likes: { connect: { id: input.id } } },
      });

      return updatedUser;
    }),
  newDislike: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const { id: currentUserId } = ctx.session.user;

      const updatedUser = await ctx.prisma.user.update({
        where: { id: currentUserId },
        data: { dislikes: { connect: { id: input.id } } },
      });

      return updatedUser;
    }),
  resetMatches: protectedProcedure.mutation(async ({ ctx }) => {
    const { id: currentUserId } = ctx.session.user;

    const updatedUser = await ctx.prisma.user.update({
      where: { id: currentUserId },
      data: { likes: { set: [] } },
    });

    return updatedUser;
  }),
});
