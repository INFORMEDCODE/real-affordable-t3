import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const lmiPremiumRouter = router({
    searchLmiPremium: publicProcedure
        .input(z.object({ loanAmount: z.number(), loanValueRatio: z.number() }))
        .query(async ({ ctx, input }) => {
            console.log("searchValues", input.loanAmount, input.loanValueRatio);
            const lmiPremiumData = await ctx.prisma.lmiPremium.findFirst({
                where: {
                    lvrLow: {
                        lte: input.loanValueRatio,
                    },
                    lvrHigh: {
                        gte: input.loanValueRatio,
                    },
                },
                include: {
                    loanAmounts: true,
                },
            });

            return lmiPremiumData?.loanAmounts.find(
                (loanAmount) =>
                    loanAmount.loanAmountLow <= input.loanAmount &&
                    loanAmount.loanAmountHigh >= input.loanAmount
            );
        }),
});
