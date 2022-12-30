import TextField from "./shared/TextField";
import Accordian from "./shared/Accordian";
import TransferDutyDisplay from "./TransferDutyTable";
import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";
import {
    calculateLMIPremium,
    calculateTransferDuty,
} from "../utils/calculations";
import ObjectiveCalculatedBlock from "./ObjectiveCalculatedBlock";
/**
 * a block that can be contained within an accordian style pane
 * block should show information like
 * - transfer duty calculation
 * - intial loan expectation
 * - deposit percentage
 */
type CalculatedBlock = {
    deposit: number;
    propertyPrice: number;
    state: string;
};

const CalculatedBlock: React.FC<CalculatedBlock> = ({
    deposit,
    propertyPrice,
    state,
}) => {
    const [calculatedLMIPremium, setCalculatedLMIPremium] = useState<number>();
    const [calculatedTransferRate, setCalculatedTransferRate] =
        useState<number>();
    const [includeTransferDuty, setIncludeTransferDuty] =
        useState<boolean>(true);
    const { data: lmiPremiumData } = trpc.lmiPremium.searchLmiPremium.useQuery({
        loanAmount: propertyPrice - deposit,
        loanValueRatio: 100 - (deposit / propertyPrice) * 100,
    });

    const { data: transferData } = trpc.state.searchAppliedRate.useQuery({
        state,
        propertyPrice,
    });
    const { data: allTransfers } = trpc.state.getState.useQuery({
        state,
    });

    useEffect(() => {
        // reset the LMI premium
        if (!lmiPremiumData) {
            setCalculatedLMIPremium(0);
            return;
        }

        setCalculatedLMIPremium(
            calculateLMIPremium(propertyPrice - deposit, lmiPremiumData.rate)
        );

        if (transferData) {
            setCalculatedTransferRate(
                calculateTransferDuty(
                    transferData.rate,
                    transferData.base,
                    transferData.rateType,
                    transferData.rangeLow,
                    propertyPrice,
                    transferData.equation == null
                        ? undefined
                        : transferData.equation
                )
            );
        }
    }, [lmiPremiumData, transferData, state]);

    return (
        <>
            {allTransfers ? (
                <Accordian title="Transfer Duty Details for State">
                    <TransferDutyDisplay stateData={allTransfers} />
                </Accordian>
            ) : null}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <label className="font-bold">
                        Transfer Duty (Stamp Duty):
                    </label>
                    <TextField
                        type="text"
                        disabled
                        className="flex items-center border border-solid p-2"
                        value={calculatedTransferRate}
                        adornment="$"
                        adornmentPosition="start"
                    />
                    <input
                        type="checkbox"
                        checked={includeTransferDuty}
                        value={includeTransferDuty as unknown as string}
                        className="h-4 w-4"
                        onChange={() =>
                            setIncludeTransferDuty(!includeTransferDuty)
                        }
                    />
                    <label className="text-sm italic">
                        Pay Transfer Duty as Upfront?
                    </label>
                </div>
                <div className="flex items-center gap-2">
                    <label className="font-bold">
                        Initial Loan Expectation:
                    </label>
                    <TextField
                        type="text"
                        disabled
                        className="flex items-center border border-solid p-2"
                        value={propertyPrice - deposit}
                        adornment="$"
                        adornmentPosition="start"
                    />
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2">
                        <label className="font-bold">Deposit Percentage:</label>
                        <TextField
                            type="text"
                            value={(deposit / propertyPrice) * 100}
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
                            value={100 - (deposit / propertyPrice) * 100}
                            disabled
                            adornment="%"
                            adornmentPosition="end"
                            className="flex items-center border border-solid p-2"
                        />
                    </div>
                </div>
                {100 - (deposit / propertyPrice) * 100 > 80 ? (
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
                transferDutyResult={
                    !includeTransferDuty
                        ? calculatedTransferRate
                            ? calculatedTransferRate
                            : 0
                        : 0
                }
                initialLoanValue={propertyPrice - deposit}
                lmiPremiumResult={calculatedLMIPremium}
                propertyPrice={propertyPrice}
            />
        </>
    );
};

export default CalculatedBlock;
