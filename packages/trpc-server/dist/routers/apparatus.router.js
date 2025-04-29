import { z } from "zod";
import { publicProcedure, router } from "../trpc.js";
import { createApparatusSchema, upsertApparatusDtoSchema, } from "@repo/db/schema/apparatus";
export const apparatusRouter = router({
    createApparatus: publicProcedure
        .input(createApparatusSchema)
        .mutation(async ({ input, ctx }) => {
        input;
        const result = await ctx.db.apparatus.create({
            data: input,
        });
        return result.id;
    }),
    getApparatusById: publicProcedure
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
    getApparatuses: publicProcedure.query(async ({ ctx }) => {
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
        .input(z.union([z.string(), z.number()]).pipe(z.coerce.number()))
        .mutation(async ({ ctx, input }) => {
        await ctx.db.apparatus.delete({
            where: {
                id: input,
            },
        });
    }),
});
