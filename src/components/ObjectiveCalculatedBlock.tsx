import TextField from "./TextField";
import { calculateRealLoanValue } from "../utils/calculations";
import { useState, useEffect } from "react";

/**
 * a block that can be contained within an accordian style pane
 * block should show information like
 * - real loan value
 * - real loan value breakdown
 *   - initial loan + transfer duty + lmi
 *   - real percent of purchase
 */

type ObjectiveCalculatedBlock = {
    initialLoanValue: number;
    transferDutyResult: number;
    lmiPremiumResult?: number;
    propertyPrice: number;
};

const ObjectiveCalculatedBlock: React.FC<ObjectiveCalculatedBlock> = ({
    initialLoanValue,
    transferDutyResult,
    lmiPremiumResult,
    propertyPrice,
}) => {
    const [calculatedRealLoanValue, setCalculatedRealLoanValue] =
        useState<number>();

    useEffect(() => {
        setCalculatedRealLoanValue(
            calculateRealLoanValue(
                initialLoanValue,
                transferDutyResult,
                lmiPremiumResult ? lmiPremiumResult : 0
            )
        );
    }, [initialLoanValue, transferDutyResult, lmiPremiumResult]);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <label className="font-bold">Real Loan Value:</label>
                <TextField
                    type="text"
                    disabled
                    value={calculatedRealLoanValue}
                    className="flex items-center border border-solid p-2"
                    adornment="$"
                    adornmentPosition="start"
                />
            </div>
            {calculatedRealLoanValue ? (
                <div className="flex items-center gap-2">
                    <label className="font-bold">Real Loan Percent:</label>
                    <TextField
                        type="text"
                        disabled
                        value={(calculatedRealLoanValue / propertyPrice) * 100}
                        className="flex items-center border border-solid p-2"
                        adornment="%"
                        adornmentPosition="end"
                    />
                </div>
            ) : null}
        </div>
    );
};

export default ObjectiveCalculatedBlock;
