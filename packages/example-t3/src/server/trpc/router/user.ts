import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const userRouter = router({
  getById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          id: input,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "ID not found",
        });
      }

      return user;
    }),
  getMe: protectedProcedure.input(z.void()).query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const user = await ctx.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Not found",
      });
    }

    return user;
  }),
});
