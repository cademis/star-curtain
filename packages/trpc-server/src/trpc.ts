import { db } from "@repo/db";
import { initTRPC } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import superjson from "superjson";

export const createTRPCContext = ({}: CreateExpressContextOptions) => ({
  db,
});

// export const createTRPCContext = ({
//   req,
//   res,
// }: CreateExpressContextOptions): { db: typeof db } => ({
//   db,
// });

// export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
export type TRPCContext = ReturnType<typeof createTRPCContext>;

export const t = initTRPC
  .context<TRPCContext>()
  .create({ transformer: superjson });

export const router = t.router;

export const publicProcedure = t.procedure;
