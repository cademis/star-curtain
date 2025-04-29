// import { PrismaClient } from "@prisma/client";
// import { it } from "node:test";

// const db = new PrismaClient();

// const copyColumns = async () => {
//   try {
//     console.log("Fetching activities...");
//     const activities = await db.activity.findMany({
//       select: {
//         id: true,
//         elapsedTime: true,
//       },
//     });

//     console.log(`Found ${activities.length} activities to update`);

//     // Use Promise.all to properly wait for all updates to complete
//     const updatePromises = activities.map(async (item) => {
//       try {
//         await db.activity.update({
//           where: {
//             id: item.id,
//           },
//           data: {
//             elapsedTime_new: item.elapsedTime?.toString(),
//           },
//         });
//         return { success: true, id: item.id };
//       } catch (error) {
//         console.error(`Failed to update activity ${item.id}:`, error);
//         return { success: false, id: item.id, error };
//       }
//     });

//     const results = await Promise.all(updatePromises);
//     const successful = results.filter((r) => r.success).length;
//     const failed = results.filter((r) => !r.success).length;

//     console.log(`Update complete: ${successful} successful, ${failed} failed`);
//   } catch (err) {
//     console.error("Error in copyColumns:", err);
//   } finally {
//     await db.$disconnect();
//     console.log("Database connection closed");
//   }
// };

// copyColumns();
