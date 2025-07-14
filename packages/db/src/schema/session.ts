import { z } from "zod";

const baseSession = {
  date: z.date().default(() => new Date()),
  description: z.string().default(""),
  notes: z.string().default(""),
} as const;

export const createSessionSchema = z.object({
  ...baseSession,
});

export const selectSessionSchema = z.object({
  id: z.number(),
  ...baseSession,
});

export const updateSessionSchema = z.object({
  id: z.number(),
  ...baseSession,
});

export const upsertSessionDtoSchema = z.object({
  id: z.number().optional(),
  ...baseSession,
});

// Type-safe utility to ensure schema matches Prisma expectations
export type CreateSessionInput = z.infer<typeof createSessionSchema>;
export type UpdateSessionInput = z.infer<typeof updateSessionSchema>;
export type SelectSessionInput = z.infer<typeof selectSessionSchema>;
