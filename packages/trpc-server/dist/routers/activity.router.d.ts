export declare const activityRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: {
        db: typeof import("@repo/db").db;
    };
    meta: object;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    getActivities: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            type: string | null;
            id: number;
            activityId: bigint;
            startDate: string | null;
            averageHeartrate: number | null;
            distance: number | null;
            averageWatts: number | null;
            averageCadence: number | null;
            elapsedTime: bigint | null;
        }[];
    }>;
}>>;
