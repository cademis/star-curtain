// model Log {
//   id Int @id @default(autoincrement())
//   apparatus_id Int?
//   apparatus Apparatus? @relation(fields: [apparatus_id], references: [id])
//   session_id Int?
//   session Session? @relation(fields: [session_id], references: [id])
//   weight Float
//   sets Int
//   reps Int
//   rir Int
//   notes String
// }

import { z } from "zod";

const baseLog = {
  apparatus_id: z.number().nullable(),
  session_id: z.number().nullable(),
  weight: z.number().default(0),
  sets: z.number().default(1),
  reps: z.number().default(1),
  rir: z.number().default(0),
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

export const upsertLogSchema = z.object({
  id: z.number().optional(),
  ...baseLog,
});

// Type-safe utility to ensure schema matches Prisma expectations
export type CreateLogInput = z.infer<typeof createLogSchema>;
export type UpdateLogInput = z.infer<typeof updateLogSchema>;
export type SelectLogInput = z.infer<typeof selectLogSchema>;
