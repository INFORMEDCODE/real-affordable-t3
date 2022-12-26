import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const stateRouter = router({
    searchAppliedRate: publicProcedure
        .input(z.object({ state: z.string(), propertyPrice: z.number() }))
        .query(async ({ input, ctx }) => {
            console.log("searchValues", input.state, input.propertyPrice);
            const stateData = await ctx.prisma.state.findUnique({
                where: {
                    state: input.state.toLowerCase(),
                },
                include: {
                    transferDuties: true,
                },
            });

            return stateData?.transferDuties.find((transferDuty) => {
                // set the high 1 above the prop price so it fits in the highest bracket
                if (!transferDuty.rangeHigh) {
                    transferDuty.rangeHigh = input.propertyPrice + 1;
                }

                return (
                    transferDuty.rangeLow <= input.propertyPrice &&
                    transferDuty.rangeHigh >= input.propertyPrice
                );
            });
        }),
});
