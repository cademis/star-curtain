import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const appRouter = router({
  getUser: publicProcedure.input(z.object({ id: z.number() })).query((opts) => {
    return { id: opts.input.id, name: "Bilbo" };
  }),
});
