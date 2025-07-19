export declare const activityRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: {
        db: import("@prisma/client").PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    };
    meta: object;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    getActivities: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            id: number;
            activityId: string;
            startDate: string | null;
            type: string | null;
            averageHeartrate: number | null;
            distance: number | null;
            averageWatts: number | null;
            averageCadence: number | null;
            elapsedTime: string | null;
            totalElevationGain: number | null;
            map: string | null;
        }[];
    }>;
}>>;
