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
                increment: number;
                movementType: string;
                bodyPart: string;
                oneRepMax?: number | undefined;
                starting_weight?: number | undefined;
            };
            output: number;
        }>;
        getApparatusById: import("@trpc/server").TRPCQueryProcedure<{
            input: number | null;
            output: {
                id: number;
                name: string;
                unit: string;
                oneRepMax: number;
                increment: number;
                bodyPart: string;
                movementType: string;
                is_per_side: boolean;
                starting_weight: number;
            } | null;
        }>;
        getApparatuses: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string;
                unit: string;
                oneRepMax: number;
                increment: number;
                bodyPart: string;
                movementType: string;
                is_per_side: boolean;
                starting_weight: number;
            }[];
        }>;
        updateApparatus: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
                unit: string;
                is_per_side: boolean;
                increment: number;
                movementType: string;
                bodyPart: string;
                oneRepMax?: number | undefined;
                starting_weight?: number | undefined;
                id?: number | undefined;
            };
            output: {
                id: number;
                name: string;
                unit: string;
                oneRepMax: number;
                increment: number;
                bodyPart: string;
                movementType: string;
                is_per_side: boolean;
                starting_weight: number;
            };
        }>;
        deleteApparatusById: import("@trpc/server").TRPCMutationProcedure<{
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
                type: string | null;
                map: string | null;
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
}>>;
