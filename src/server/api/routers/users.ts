import { z } from "zod";
import { UserOnboarding } from "~/common/validation/user";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany();
    return {
      users,
    };
  }),
  update: protectedProcedure
    .input(UserOnboarding)
    .mutation(async ({ ctx, input }) => {
      const { id: currentUserId } = ctx.session.user;

      const updatedUser = await ctx.prisma.user.update({
        where: { id: currentUserId },
        data: input,
      });

      return updatedUser;
    }),
});
