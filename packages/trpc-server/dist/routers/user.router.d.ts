export declare const userRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
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
