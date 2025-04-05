import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers/root.js";
export declare const trpcExpress: ReturnType<typeof createExpressMiddleware>;
export type AppRouter = typeof appRouter;
