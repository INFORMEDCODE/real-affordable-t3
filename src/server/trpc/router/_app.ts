import { router } from "../trpc";
import { stateRouter } from "./state";
import { lmiPremiumRouter } from "./lmiPremium";

export const appRouter = router({
    state: stateRouter,
    lmiPremium: lmiPremiumRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
