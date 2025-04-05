// https://strengthlevel.com/one-rep-max-calculator

export const generateReps = (step = 1) => {
  //1rm 100%

  return Array.from({ length: 300 }, (_, i) => {
    const base = i * step + step; // 8rm as base, stepping by step amount
    return {
      rm1: Math.round(base * (100 / 81)),
      //5rm 89%
      rm5: Math.round(base * (89 / 81)),
      //8rm 81%
      rm8: base,
      //12rm 71%
      rm12: Math.round(base * (71 / 81)),
      //15rm 67%
      rm15: Math.round(base * (67 / 81)),
    };
  });
};
