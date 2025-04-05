export const Unit = {
  Kg: "kg",
  Lbs: "lbs",
} as const;

export type UnitType = (typeof Unit)[keyof typeof Unit];
