import { z } from "zod";

export const bodyParts = [
  { field: "back", title: "Back" },
  { field: "upperBack", title: "Upper Back" },
  { field: "lowerBack", title: "Lower Back" },
  { field: "chest", title: "Chest" },
  { field: "shoulders", title: "Shoulders" },
  { field: "legs", title: "Legs" },
  { field: "other", title: "Other" },
] as const;

export const BodyPartEnum = z.enum(
  bodyParts.map((part) => part.field) as [string, ...string[]]
);

export const movementTypes = [
  { field: "push", title: "Push" },
  { field: "pull", title: "Pull" },
  { field: "legs", title: "Legs" },
  { field: "na", title: "N/A" },
] as const;

export const MovementTypeEnum = z.enum(
  movementTypes.map((part) => part.field) as [string, ...string[]]
);

// model Apparatus {
//  id Int @id @default(autoincrement())
//  name String
//  unit String
//  oneRepMax Float
//  increment Int
//  bodyPart String
//  movementType String
//  is_per_side Boolean
//  starting_weight Float
//  logs Log[]
// }

const baseApparatus = {
  name: z.string(),
  unit: z.string(),
  is_per_side: z.boolean(),
  increment: z.coerce.number().min(0.1),
  movementType: z.string(),
  bodyPart: z.string(),
  oneRepMax: z.coerce.number().min(0),
  starting_weight: z.coerce.number().min(0),
} as const;

export const apparatusSelectSchema = z.object({
  id: z.number(),
  ...baseApparatus,
});

export const apparatusUpdateSchema = z.object({
  id: z.number(),
  ...baseApparatus,
});

export const apparatusInsertSchema = z.object({
  ...baseApparatus,
});
