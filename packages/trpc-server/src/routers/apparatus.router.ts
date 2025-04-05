import { z } from "zod";
import { publicProcedure, router } from "../trpc.js";
import {
  createApparatusSchema,
  updateApparatusSchema,
} from "@repo/db/schema/apparatus";

export const apparatusRouter = router({
  createApparatus: publicProcedure
    .input(createApparatusSchema)
    .mutation(async ({ input, ctx }) => {
      const { ...data } = input;

      const result = await ctx.db.apparatus.create({
        data,
      });
      return result.id;
    }),
  getApparatusById: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return ctx.db.apparatus.findUnique({
        where: {
          id: input,
        },
      });
    }),
  getApparatuses: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.apparatus.findMany();
  }),
  updateApparatus: publicProcedure
    .input(updateApparatusSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...data } = input;
      const result = await ctx.db.apparatus.update({
        where: { id },
        data,
      });
      return result;
    }),

  deleteApparatusById: publicProcedure
    .input(z.union([z.string(), z.number()]).pipe(z.coerce.number()))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.apparatus.delete({
        where: {
          id: input,
        },
      });
    }),
});
