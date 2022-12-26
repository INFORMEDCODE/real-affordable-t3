/**
 * a block that can be contained within an accordian style pane
 * block should show information like
 * - transfer duty calculation
 * - intial loan expectation
 * - deposit percentage
 * - real loan likelihood
 * - real loan likelihook breakdown
 *   - minus transfer duty
 *   - minus lmi
 *   - percent of purchasePrice
 */
type CalculatedBlock = {
    transferDutyResult: number;
    initialExpectedLoan: number;
    depositPercent: number;
};

const CalculatedBlock: React.FC<CalculatedBlock> = ({
    transferDutyResult,
    initialExpectedLoan,
    depositPercent,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <label className="font-bold">Transfer Duty (Stamp Duty):</label>
                <input
                    type="text"
                    disabled
                    className="border border-solid p-2"
                    value={transferDutyResult}
                />
            </div>
            <div className="flex items-center gap-2">
                <label className="font-bold">Initial Loan Expectation:</label>
                <input
                    type="text"
                    disabled
                    className="border border-solid p-2"
                    value={initialExpectedLoan}
                />
            </div>
            <div className="flex gap-2">
                <div className="flex items-center gap-2">
                    <label className="font-bold">Deposit Percentage:</label>
                    <input
                        type="text"
                        disabled
                        value={depositPercent}
                        className="border border-solid p-2"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label className="font-bold">Remaining Percent:</label>
                    <input
                        type="text"
                        className="border border-solid p-2"
                        value={100 - depositPercent}
                    />
                </div>
            </div>
        </div>
    );
};

export default CalculatedBlock;
