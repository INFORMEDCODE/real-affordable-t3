import { router } from "../trpc";
import { stateRouter } from "./state";

export const appRouter = router({
    state: stateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
