import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const messagesRouter = createTRPCRouter({
  // getThread: protectedProcedure
  //   .input(z.object({ id: z.string().cuid() }))
  //   .query(async ({ ctx, input }) => {
  //     const messages = await ctx.prisma.message.findMany({
  //       where: {
  //         OR: [
  //           { authorId: ctx.session.user.id },
  //           { recipientId: ctx.session.user.id },
  //         ],
  //       },
  //     });
  //   }),
  send: protectedProcedure
    .input(
      z.object({
        recipientId: z.string().cuid(),
        message: z.string().min(1).max(1024),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: currentUserId } = ctx.session.user;
      const areUsersMatched = await ctx.prisma.user.findFirst({
        where: {
          id: currentUserId,
          likedBy: { some: { id: input.recipientId } },
          likes: { some: { id: input.recipientId } },
        },
      });
      if (!areUsersMatched)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You can only message users you have matched with.",
        });
      const sentMessage = await ctx.prisma.message.create({
        data: {
          authorId: currentUserId,
          recipientId: input.recipientId,
          message: input.message,
        },
      });

      return sentMessage;
    }),
});
