export declare const appRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: {
        db: import("@prisma/client").PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    };
    meta: object;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    user: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: {
            db: import("@prisma/client").PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
        };
        meta: object;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        getUserById: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                name: string;
            };
        }>;
        getUsers: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                email: string;
            }[];
        }>;
        createUser: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                email: string;
            };
            output: void;
        }>;
    }>>;
    apparatus: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: {
            db: import("@prisma/client").PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
        };
        meta: object;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        createApparatus: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
                unit: string;
                is_per_side: boolean;
                increment: unknown;
                movementType: string;
                bodyPart: string;
                oneRepMax: unknown;
                starting_weight: unknown;
            };
            output: number;
        }>;
        getApparatus: import("@trpc/server").TRPCQueryProcedure<{
            input: number | null;
            output: {
                id: number;
                name: string;
                unit: string;
                is_per_side: boolean;
                increment: number;
                movementType: string;
                bodyPart: string;
                oneRepMax: number;
                starting_weight: number;
            } | null;
        }>;
        getAllApparatus: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string;
                unit: string;
                is_per_side: boolean;
                increment: number;
                movementType: string;
                bodyPart: string;
                oneRepMax: number;
                starting_weight: number;
            }[];
        }>;
        updateApparatus: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
                unit: string;
                is_per_side: boolean;
                increment: unknown;
                movementType: string;
                bodyPart: string;
                oneRepMax: unknown;
                starting_weight: unknown;
                id: number;
            };
            output: {
                id: number;
                name: string;
                unit: string;
                is_per_side: boolean;
                increment: number;
                movementType: string;
                bodyPart: string;
                oneRepMax: number;
                starting_weight: number;
            };
        }>;
        deleteApparatus: import("@trpc/server").TRPCMutationProcedure<{
            input: number;
            output: void;
        }>;
    }>>;
    activity: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
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
                map: string | null;
                type: string | null;
                activityId: string;
                startDate: string | null;
                averageHeartrate: number | null;
                distance: number | null;
                averageWatts: number | null;
                averageCadence: number | null;
                elapsedTime: string | null;
                totalElevationGain: number | null;
            }[];
        }>;
    }>>;
    log: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: {
            db: import("@prisma/client").PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
        };
        meta: object;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        getLog: import("@trpc/server").TRPCQueryProcedure<{
            input: number;
            output: {
                id: number;
                apparatus_id: number | null;
                session_id: number | null;
                weight: number;
                sets: number;
                reps: number;
                rir: number;
                notes: string;
            } | null;
        }>;
        getAllLogs: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                apparatus_id: number | null;
                session_id: number | null;
                weight: number;
                sets: number;
                reps: number;
                rir: number;
                notes: string;
            }[];
        }>;
        getAllLogsWithApparatus: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                apparatus: undefined;
                id: number;
                name?: string | undefined;
                unit?: string | undefined;
                is_per_side?: boolean | undefined;
                increment?: number | undefined;
                movementType?: string | undefined;
                bodyPart?: string | undefined;
                oneRepMax?: number | undefined;
                starting_weight?: number | undefined;
                apparatus_id: number | null;
                session_id: number | null;
                weight: number;
                sets: number;
                reps: number;
                rir: number;
                notes: string;
            }[];
        }>;
        createLog: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                apparatus_id: unknown;
                session_id: unknown;
                weight: unknown;
                sets: unknown;
                reps: unknown;
                rir: unknown;
                notes: string;
            };
            output: {
                id: number;
                apparatus_id: number | null;
                session_id: number | null;
                weight: number;
                sets: number;
                reps: number;
                rir: number;
                notes: string;
            };
        }>;
        updateLog: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                apparatus_id: unknown;
                session_id: unknown;
                weight: unknown;
                sets: unknown;
                reps: unknown;
                rir: unknown;
                notes: string;
                id: number;
            };
            output: void;
        }>;
        deleteLog: import("@trpc/server").TRPCMutationProcedure<{
            input: number;
            output: {
                success: boolean;
            };
        }>;
    }>>;
}>>;
