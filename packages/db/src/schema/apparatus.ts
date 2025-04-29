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

const baseApparatus = {
  name: z.string(),
  unit: z.string(),
  isUnilateral: z.boolean(),
  reps: z.coerce.number(),
  increment: z.coerce.number(),
  movementType: z.string(),
  bodyPart: z.string(),
  oneRepMax: z.coerce.number().optional(),
};

export const createApparatusSchema = z.object({
  ...baseApparatus,
});

export const selectApparatusSchema = z.object({
  id: z.number(),
  ...baseApparatus,
});

export const updateApparatusSchema = z.object({
  id: z.number(),
  ...baseApparatus,
});

export const upsertApparatusDtoSchema = z.object({
  id: z.number().optional(),
  ...baseApparatus,
});
