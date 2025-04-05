import { z } from "zod";
import { publicProcedure, router } from "../trpc.js";

export const userRouter = router({
  getUserById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query((opts) => {
      return { id: opts.input.id, name: "Bilbo" };
    }),
  getUsers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany();
  }),
  createUser: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.user.create({
        data: {
          email: input.email,
        },
      });
    }),
});
