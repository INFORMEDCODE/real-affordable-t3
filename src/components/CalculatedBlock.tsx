import TextField from "./TextField";
import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";
import { calculateLMIPremium } from "../utils/calculations";
import ObjectiveCalculatedBlock from "./ObjectiveCalculatedBlock";
/**
 * a block that can be contained within an accordian style pane
 * block should show information like
 * - transfer duty calculation
 * - intial loan expectation
 * - deposit percentage
 */
type CalculatedBlock = {
    transferDutyResult: number;
    initialExpectedLoan: number;
    depositPercent: number;
    propertyPrice: number;
};

const CalculatedBlock: React.FC<CalculatedBlock> = ({
    transferDutyResult,
    initialExpectedLoan,
    depositPercent,
    propertyPrice,
}) => {
    const [calculatedLMIPremium, setCalculatedLMIPremium] = useState<number>();
    const { data, isLoading } = trpc.lmiPremium.searchLmiPremium.useQuery({
        loanAmount: initialExpectedLoan,
        loanValueRatio: 100 - depositPercent,
    });

    useEffect(() => {
        // reset the LMI premium
        if (!data) {
            setCalculatedLMIPremium(0);
            return;
        }

        setCalculatedLMIPremium(
            calculateLMIPremium(initialExpectedLoan, data.rate)
        );
    }, [data]);

    console.log("calculation", data);

    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <label className="font-bold">
                        Transfer Duty (Stamp Duty):
                    </label>
                    <TextField
                        type="text"
                        disabled
                        className="flex items-center border border-solid p-2"
                        value={transferDutyResult}
                        adornment="$"
                        adornmentPosition="start"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label className="font-bold">
                        Initial Loan Expectation:
                    </label>
                    <TextField
                        type="text"
                        disabled
                        className="flex items-center border border-solid p-2"
                        value={initialExpectedLoan}
                        adornment="$"
                        adornmentPosition="start"
                    />
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2">
                        <label className="font-bold">Deposit Percentage:</label>
                        <TextField
                            type="text"
                            value={depositPercent}
                            disabled
                            adornment="%"
                            adornmentPosition="end"
                            className="flex items-center border border-solid p-2"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-bold">Remaining Percent:</label>
                        <TextField
                            type="text"
                            value={100 - depositPercent}
                            disabled
                            adornment="%"
                            adornmentPosition="end"
                            className="flex items-center border border-solid p-2"
                        />
                    </div>
                </div>
                {100 - depositPercent > 80 ? (
                    <div className="flex gap-2">
                        <div className="flex items-center gap-2">
                            <label className="font-bold">
                                Lenders Mortgage Insurance:
                            </label>
                            <TextField
                                type="text"
                                value={calculatedLMIPremium}
                                disabled
                                adornment="$"
                                adornmentPosition="start"
                                className="flex items-center border border-solid p-2"
                            />
                        </div>
                    </div>
                ) : null}
            </div>
            <ObjectiveCalculatedBlock
                transferDutyResult={transferDutyResult}
                initialLoanValue={initialExpectedLoan}
                lmiPremiumResult={calculatedLMIPremium}
                propertyPrice={propertyPrice}
            />
        </>
    );
};

export default CalculatedBlock;
