import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";

const db = new PrismaClient();

const exportData = async () => {
  try {
    const activities = await db.activity.findMany();
    const apparatuses = await db.apparatus.findMany();

    const data = { activities, apparatuses };

    // Create TypeScript content with type definitions
    const tsContent = `import { Activity, Apparatus } from "@prisma/client";

export const seedData = ${JSON.stringify(data, null, 2)} as {
  activities: Activity[];
  apparatuses: Apparatus[];
};
`;

    await fs.writeFile("./prisma/seed-data.ts", tsContent);
    console.log("Data exported successfully to TypeScript file");
  } catch (error) {
    console.log(error);
  } finally {
    await db.$disconnect();
  }
};

exportData();
