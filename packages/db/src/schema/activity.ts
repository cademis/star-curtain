import { z } from "zod";

export const getActivitySchema = z
  .object({
    id: z.number(),
    start_date: z.string().optional(),
    average_heartrate: z.number().optional(),
    type: z.string().optional(),
    distance: z.number().optional(),
    average_watts: z.number().optional(),
    elapsed_time: z.number().optional(),
    average_cadence: z.number().optional(),
  })
  .transform((activity) => {
    const {
      id,
      start_date: startDate,
      average_heartrate: averageHeartrate,
      type,
      distance,
      average_watts: averageWatts,
      elapsed_time: elapsedTime,
      average_cadence: averageCadence,
    } = activity;

    return {
      id,
      startDate,
      averageHeartrate,
      type,
      distance,
      averageWatts,
      elapsedTime,
      averageCadence,
    };
  });
