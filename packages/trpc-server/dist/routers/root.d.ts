export declare const appRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: {
        db: typeof import("@repo/db").db;
    };
    meta: object;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    user: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: {
            db: typeof import("@repo/db").db;
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
            db: typeof import("@repo/db").db;
        };
        meta: object;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
        createApparatus: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
                unit: string;
                movementType: string;
                bodyPart: string;
                isUnilateral?: boolean | undefined;
                baseRm?: number | undefined;
                increment?: number | undefined;
            };
            output: number;
        }>;
        getApparatusById: import("@trpc/server").TRPCQueryProcedure<{
            input: number;
            output: {
                id: number;
                name: string;
                unit: string;
                baseRm: number | null;
                brandId: number | null;
                isUnilateral: boolean;
                increment: number;
                bodyPart: string | null;
                movementType: string | null;
            } | null;
        }>;
        getApparatuses: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string;
                unit: string;
                baseRm: number | null;
                brandId: number | null;
                isUnilateral: boolean;
                increment: number;
                bodyPart: string | null;
                movementType: string | null;
            }[];
        }>;
        updateApparatus: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                name: string;
                unit: string;
                movementType: string;
                bodyPart: string;
                isUnilateral?: boolean | undefined;
                baseRm?: number | undefined;
                increment?: number | undefined;
            };
            output: {
                id: number;
                name: string;
                unit: string;
                baseRm: number | null;
                brandId: number | null;
                isUnilateral: boolean;
                increment: number;
                bodyPart: string | null;
                movementType: string | null;
            };
        }>;
        deleteApparatusById: import("@trpc/server").TRPCMutationProcedure<{
            input: string | number;
            output: void;
        }>;
    }>>;
    activity: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
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
}>>;
