import { z } from "zod";

const baseLog = {
  apparatus_id: z.number(),
  session_id: z.number(),
  weight: z.number().optional(),
  sets: z.number().default(1),
  reps: z.number().default(1),
  rir: z.number().default(0),
  actual_rir: z.number().default(0),
  notes: z.string().default(""),
} as const;

export const createLogSchema = z.object({
  ...baseLog,
});

export const selectLogSchema = z.object({
  id: z.number(),
  ...baseLog,
});

export const updateLogSchema = z.object({
  id: z.number(),
  ...baseLog,
});

export const upsertLogDtoSchema = z.object({
  id: z.number().optional(),
  ...baseLog,
});

// Type-safe utility to ensure schema matches Prisma expectations
export type CreateLogInput = z.infer<typeof createLogSchema>;
export type UpdateLogInput = z.infer<typeof updateLogSchema>;
export type SelectLogInput = z.infer<typeof selectLogSchema>;
