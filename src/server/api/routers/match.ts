import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const matchRouter = createTRPCRouter({
  whoLikesMe: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const whoLikesMe = await ctx.prisma.user.findMany({
        where: { likes: { some: { id: input.id } } },
      });
      return whoLikesMe.map((user) => user.id);
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
});
