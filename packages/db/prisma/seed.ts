// import { PrismaClient } from "@prisma/client";
// import data from "./seed-data.json";
// import { getActivitySchema } from "packages/db/dist/schema/activity.js";
// import { z } from "zod";

// const db = new PrismaClient();

// const seed = async () => {
//   const parsedActivities = z.array(getActivitySchema).parse(data.activities);

//   try {
//     await db.activity.updatedMany({
//       data: parsedActivities.map((activity) => ({
//         activityId: activity.activityId,
//         startDate: activity.startDate,
//         type: activity.type,
//         averageHeartrate: activity.averageHeartrate,
//         distance: activity.distance,
//         averageWatts: activity.averageWatts,
//         averageCadence: activity.averageCadence,
//         elapsedTime: activity.elapsedTime,
//       })),
//     });
//   } catch (error) {
//     console.log(error);
//   } finally {
//     await db.$disconnect();
//   }
// };
