import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers/root.js";
import { createTRPCContext } from "./trpc.js";

export const trpcExpress = createExpressMiddleware({
  router: appRouter,
  createContext: createTRPCContext,
}) as ReturnType<typeof createExpressMiddleware>;

export type AppRouter = typeof appRouter;
