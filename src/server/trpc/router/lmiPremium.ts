import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const lmiPremiumRouter = router({
    searchLmiPremium: publicProcedure
        .input(z.object({ propertyPrice: z.number() }))
        .query(async ({ ctx, input }) => {}),
});
