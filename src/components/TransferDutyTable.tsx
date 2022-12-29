// display for showing the transfer duty calculations for that state
import { type State, TransferDuty } from "@prisma/client";

type TransferDutyDisplay = {
    stateData: State & { transferDuties: TransferDuty[] };
    activeRange?: number;
};

const TransferDutyDisplay: React.FC<TransferDutyDisplay> = ({
    stateData,
    activeRange,
}) => {
    return (
        <table className="w-full">
            <tr className="text-left">
                <th>Property Min</th>
                <th>Property Max</th>
                <th>Rate</th>
                <th>Base</th>
                <th>Rate Calculation</th>
            </tr>
            {stateData.transferDuties
                .sort((a, b) => a.rangeLow - b.rangeLow)
                .map((transferDuty) => (
                    <tr
                        className={`text-left ${
                            transferDuty.rangeLow == activeRange
                                ? "bg-slate-200"
                                : ""
                        }`}
                    >
                        <td>{transferDuty.rangeLow}</td>
                        <td>{transferDuty.rangeHigh}</td>
                        <td>{transferDuty.rate}</td>
                        <td>{transferDuty.base}</td>
                        <td>Rate for every $100 over Property Min + Base</td>
                    </tr>
                ))}
        </table>
    );
};

export default TransferDutyDisplay;
