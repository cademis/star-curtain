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
                isUnilateral: boolean;
                reps: number;
                increment: number;
                movementType: string;
                bodyPart: string;
                oneRepMax?: number | undefined;
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
                reps: number;
                isUnilateral: boolean;
                increment: number;
                bodyPart: string;
                movementType: string;
            } | null;
        }>;
        getApparatuses: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string;
                unit: string;
                oneRepMax: number;
                reps: number;
                isUnilateral: boolean;
                increment: number;
                bodyPart: string;
                movementType: string;
            }[];
        }>;
        updateApparatus: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
                unit: string;
                isUnilateral: boolean;
                reps: number;
                increment: number;
                movementType: string;
                bodyPart: string;
                id?: number | undefined;
                oneRepMax?: number | undefined;
            };
            output: {
                id: number;
                name: string;
                unit: string;
                oneRepMax: number;
                reps: number;
                isUnilateral: boolean;
                increment: number;
                bodyPart: string;
                movementType: string;
            };
        }>;
        deleteApparatusById: import("@trpc/server").TRPCMutationProcedure<{
            input: string | number;
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
                type: string | null;
                map: string | null;
                id: number;
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
