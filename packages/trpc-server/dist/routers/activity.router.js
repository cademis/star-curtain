import { publicProcedure, router } from "../trpc.js";
export const activityRouter = router({
    getActivities: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.activity.findMany();
    }),
});
