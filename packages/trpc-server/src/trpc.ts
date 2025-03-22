import { initTRPC } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import superjson from "superjson";

export const createContext = ({
  req,
  res,
}: CreateExpressContextOptions) => ({}); // no context

export type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create({ transformer: superjson });

export const router = t.router;

export const publicProcedure = t.procedure;
