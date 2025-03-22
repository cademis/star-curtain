import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";
import { createContext } from "./trpc";

export const trpcExpress = createExpressMiddleware({
  router: appRouter,
  createContext,
}) as ReturnType<typeof createExpressMiddleware>;

export type AppRouter = typeof appRouter;
