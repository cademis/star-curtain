export declare const apparatusRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: {
        db: import("@prisma/client").PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    };
    meta: object;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    createApparatus: import("@trpc/server").TRPCMutationProcedure<{
        input: any;
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
        input: any;
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
