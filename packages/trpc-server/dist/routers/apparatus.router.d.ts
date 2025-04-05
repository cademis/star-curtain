export declare const apparatusRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
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
