import { PrismaClient } from "@prisma/client";
import lmiPremiumData from "./lmiPremiumData.json";
import transferDutyData from "./transferDutyData.json";

const prisma = new PrismaClient();

const seedStateAndTransferDuties = async () => {
    Object.entries(transferDutyData).map(async (transferDuty) => {
        const stateCreate = await prisma.state.upsert({
            where: {
                state: transferDuty[0],
            },
            create: {
                state: transferDuty[0],
                source: transferDuty[1].source,
            },
            update: {
                state: transferDuty[0],
                source: transferDuty[1].source,
            },
        });

        transferDuty[1].transferDuties.forEach(async (transferDuty) => {
            try {
                await prisma.transferDuty.create({
                    data: {
                        stateId: stateCreate.id,
                        rangeHigh:
                            transferDuty.rangeHigh == null
                                ? undefined
                                : transferDuty.rangeHigh,
                        rangeLow: transferDuty.rangeLow,
                        rate: transferDuty.rate,
                        base: transferDuty.base,
                        rateType: transferDuty.rateType,
                        equation:
                            transferDuty.equation == null
                                ? undefined
                                : transferDuty.equation,
                    },
                });
            } catch (e) {
                console.log(
                    `Failed to create transfer duty for ${stateCreate.state}; duty: ${transferDuty.rangeLow} - ${transferDuty.rangeHigh}`
                );
            }
        });
    });
};

const seedLMIAndLoanAmounts = async () => {
    lmiPremiumData.map(async (lmiPremiumSingle) => {
        const lmiPremiumCreate = await prisma.lmiPremium.create({
            data: {
                lvrLow: lmiPremiumSingle.lvrLow,
                lvrHigh: lmiPremiumSingle.lvrHigh,
            },
        });

        lmiPremiumSingle.loanAmounts.forEach(async (loanAmountData) => {
            await prisma.lmiLoanAmounts.create({
                data: {
                    lmiPremiumId: lmiPremiumCreate.id,
                    loanAmountLow: loanAmountData.loanAmountLow,
                    loanAmountHigh: loanAmountData.loanAmountHigh,
                    rate: loanAmountData.rate,
                },
            });
        });
    });
};

async function main() {
    await seedStateAndTransferDuties();
    await seedLMIAndLoanAmounts();
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
