export declare const apparatusRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
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
