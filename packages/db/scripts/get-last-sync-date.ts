import { db } from "@repo/db";
import { z } from "zod";

const schema = z.coerce.date();

const getLastSyncDate = async () => {
  const result = await db.activity.findFirst({
    orderBy: {
      startDate: "desc",
    },
  });
  if (!result) {
    return;
  }

  return schema.parse(result.startDate);
  //   return result.startDate;
};

export const getLastSyncPreviousDateAsync = async (
  daysToSubtract: number = 1
) => {
  const lastSyncDate = await getLastSyncDate();

  if (!lastSyncDate) {
    return;
  }

  const previousDate = new Date(lastSyncDate);
  previousDate.setDate(previousDate.getDate() - daysToSubtract);
  previousDate.setHours(0, 0, 0, 0);

  return Math.floor(previousDate.getTime() / 1000);
};
