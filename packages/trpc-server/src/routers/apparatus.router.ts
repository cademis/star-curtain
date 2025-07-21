import { z } from "zod";
import { publicProcedure, router } from "../trpc.js";
import {
  createApparatusSchema,
  updateApparatusSchema,
  upsertApparatusDtoSchema,
} from "@repo/db/schema/apparatus";

export const apparatusRouter = router({
  createApparatus: publicProcedure
    .input(createApparatusSchema)
    .mutation(async ({ input, ctx }) => {
      const {
        bodyPart,
        increment,
        is_per_side,
        movementType,
        name,
        unit,
        oneRepMax,
        starting_weight,
      } = input;
      const result = await ctx.db.apparatus.create({
        data: {
          bodyPart,
          movementType,
          name,
          increment,
          is_per_side,
          oneRepMax,
          starting_weight,
          unit,
        },
      });
      return result.id;
    }),
  getApparatus: publicProcedure
    .input(z.number().nullable())
    .query(async ({ ctx, input }) => {
      if (input === null) {
        return null;
      }

      const result = await ctx.db.apparatus.findUnique({
        where: {
          id: input,
        },
      });

      if (!result) {
        return null;
      }

      return result;
    }),
  getAllApparatus: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.apparatus.findMany();
  }),
  updateApparatus: publicProcedure
    .input(upsertApparatusDtoSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...data } = input;
      const result = await ctx.db.apparatus.update({
        where: { id },
        data,
      });
      return result;
    }),

  deleteApparatusById: publicProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.apparatus.delete({
        where: {
          id: input,
        },
      });
    }),
});
