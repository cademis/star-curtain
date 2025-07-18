import { z } from "zod";
import { publicProcedure, router } from "../trpc.js";
import { createLogSchema } from "../schemas/log.schema.js";

export const logRouter = router({
  getLogById: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.log.findUnique({
        where: {
          id: input,
        },
      });
      return result;
    }),
  getLogsWithApparatus: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.log.findMany({
      include: {
        apparatus: true,
      },
    });
    const flattened = result.map(({ apparatus, ...log }) => ({
      ...log,
      ...apparatus,
      apparatus: undefined,
    }));
    return flattened;
  }),
  getLog: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const result = await ctx.db.log.findUnique({
      where: { id: input },
      include: {
        apparatus: true,
      },
    });
    return result;
  }),
  createLog: publicProcedure
    .input(createLogSchema)
    .mutation(async ({ ctx, input }) => {
      const { notes, reps, rir, sets, weight } = input;
      const result = await ctx.db.log.create({
        data: {
          notes,
          reps,
          rir,
          sets,
          weight,
        },
      });
      return result;
    }),
});
