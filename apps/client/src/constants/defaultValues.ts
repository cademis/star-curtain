import { bodyParts, upsertApparatusDtoSchema } from "@repo/db/schema/apparatus";
import { z } from "zod";

export const defaultValues: z.infer<typeof upsertApparatusDtoSchema> = {
  name: "",
  unit: "kg",
  isUnilateral: false,
  oneRepMax: 0,
  reps: 8,
  increment: 2.5,
  movementType: "",
  bodyPart: bodyParts[0].field,
};
