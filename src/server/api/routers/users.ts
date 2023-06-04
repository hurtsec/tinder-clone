import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { UserOnboarding } from "~/common/validation/user";

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
