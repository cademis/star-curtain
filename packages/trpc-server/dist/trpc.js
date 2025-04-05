import { db } from "@repo/db";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
export const createTRPCContext = ({}) => ({
    db,
}); // no context
export const t = initTRPC
    .context()
    .create({ transformer: superjson });
export const router = t.router;
export const publicProcedure = t.procedure;
