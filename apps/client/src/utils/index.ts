// https://strengthlevel.com/one-rep-max-calculator

//if i squat 30 reps of 100kg, my estimated 1 rep max should be 50kg. is this function correct?

const values = [
  { rm: 1, percentage: 100 },
  { rm: 2, percentage: 97 },
  { rm: 3, percentage: 94 },
  { rm: 4, percentage: 92 },
  { rm: 5, percentage: 89 },
  { rm: 6, percentage: 86 },
  { rm: 7, percentage: 83 },
  { rm: 8, percentage: 81 },
  { rm: 9, percentage: 78 },
  { rm: 10, percentage: 75 },
  { rm: 11, percentage: 73 },
  { rm: 12, percentage: 71 },
  { rm: 13, percentage: 70 },
  { rm: 14, percentage: 68 },
  { rm: 15, percentage: 67 },
  { rm: 16, percentage: 65 },
  { rm: 17, percentage: 64 },
  { rm: 18, percentage: 63 },
  { rm: 19, percentage: 61 },
  { rm: 20, percentage: 60 },
  { rm: 21, percentage: 59 },
  { rm: 22, percentage: 58 },
  { rm: 23, percentage: 57 },
  { rm: 24, percentage: 56 },
  { rm: 25, percentage: 55 },
  { rm: 26, percentage: 54 },
  { rm: 27, percentage: 53 },
  { rm: 28, percentage: 52 },
  { rm: 29, percentage: 51 },
  { rm: 30, percentage: 50 },
] as const;

export const calculateEstimatedOneRepMax = (
  reps: number | undefined,
  weight: number | undefined
): number | null => {
  if (reps === undefined || weight === undefined) return null;

  if (reps < 1 || reps > 30) {
    throw Error("Reps must be between 1 and 30");
  }
  const percentage = values.find((value) => value.rm === reps)?.percentage;
  if (!percentage) {
    throw Error("Percentage must be of the defined values");
  }
  return Math.round((weight * 100) / percentage);
};

export const calculateEstimatedWeight = (reps: number, oneRepMax: number) => {
  if (reps < 1 || reps > 30) {
    throw Error("Reps must be between 1 and 30");
  }
  const percentage = values.find((value) => value.rm === reps)?.percentage;
  if (!percentage) {
    throw Error("Percentage must be of the defined values");
  }
  return Math.round((oneRepMax * percentage) / 100);
};

// export type GenerateReps = ReturnType<typeof generateReps>;

export const generateReps = (step = 1) => {
  //1rm 100%

  return Array.from({ length: 400 }, (_, i) => {
    const base = (i - 100) * step + step; // 8rm as base, stepping by step amount

    const mappedValues = values.map((value) => ({
      rm: value.rm,
      weight: Math.round(base * (value.percentage / 100)),
    }));

    return mappedValues;

    // return {
    //   rm1: base,
    //   //5rm 89%
    //   rm5: Math.round(base * (89 / 100)),
    //   //8rm 81%
    //   rm8: base,
    //   //10rm 75%
    //   rm10: Math.round(base * (75 / 100)),
    //   //12rm 71%
    //   rm12: Math.round(base * (71 / 100)),
    //   //15rm 67%
    //   rm15: Math.round(base * (67 / 100)),
    // };
  });
};

export const roundToNearestIncrement = (
  value: number,
  increment: number
): number => {
  if (increment <= 0) return value;
  return Math.floor(value / increment) * increment;
};

export const kgToLbs = (kg: number) => kg * 2.20462;

export const lbsToKg = (lbs: number) => lbs / 2.20462;
