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
  apparatus_id: z.coerce.number().nullable(),
  session_id: z.coerce.number().nullable(),
  weight: z.coerce.number(),
  sets: z.coerce.number().min(1),
  reps: z.coerce.number().min(1),
  rir: z.coerce.number().min(0),
  notes: z.string(),
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
