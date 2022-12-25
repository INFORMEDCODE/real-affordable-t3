import { PrismaClient } from "@prisma/client";
import transferDutyData from "./transferDutyData.json";

const prisma = new PrismaClient();

async function main() {
    Object.entries(transferDutyData).map(async (transferDuty) => {
        const stateCreate = await prisma.state.create({
            data: {
                state: transferDuty[0],
                source: transferDuty[1].source,
            },
        });

        transferDuty[1].transferDuties.forEach(async (transferDuty) => {
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
                },
            });
        });
    });
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
