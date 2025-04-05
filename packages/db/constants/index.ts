import { z } from "zod";

const BodyPart = {
  UPPER_BACK: "upperBack",
  LOWER_BACK: "lowerBack",
  CHEST: "chest",
  SHOULDERS: "shoulders",
  LEGS: "legs",
} as const;

export const BodyPartEnum = z.enum([
  BodyPart.UPPER_BACK,
  BodyPart.LOWER_BACK,
  BodyPart.CHEST,
  BodyPart.SHOULDERS,
  BodyPart.LEGS,
]);
