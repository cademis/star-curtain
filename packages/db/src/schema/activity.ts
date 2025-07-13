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
    total_elevation_gain: z.number().optional(),
    map: z.string().optional(),
  })
  .transform((activity) => {
    const {
      id: activityId,
      start_date: startDate,
      average_heartrate: averageHeartrate,
      type,
      distance,
      average_watts: averageWatts,
      elapsed_time: elapsedTime,
      average_cadence: averageCadence,
      total_elevation_gain: totalElevationGain,
      map,
    } = activity;

    return {
      activityId,
      startDate,
      averageHeartrate,
      type,
      distance,
      averageWatts,
      elapsedTime,
      averageCadence,
      totalElevationGain,
      map,
    };
  });

export const updateActivitySchema = z.object({
  id: z.number(),
  startDate: z.string(),
  averageHeartrate: z.string(),
  type: z.string(),
  distance: z.string(),
  averageWatts: z.string(),
  elapsedTime: z.string(),
  averageCadence: z.string(),
});
