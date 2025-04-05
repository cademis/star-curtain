import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers/root.js";
import { createTRPCContext } from "./trpc.js";
export const trpcExpress = createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
});
