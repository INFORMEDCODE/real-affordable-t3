import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { calculateTransferDuty, roundToNearest } from "../utils/calculations";

const Home: NextPage = () => {
    const [calculatedRate, setCalculatedRate] = useState<number>();
    const [enteredState, setEnteredState] = useState<string>("WA");
    const [enteredPropertyPrice, setEnteredPropertyPrice] = useState<number>(0);
    const utils = trpc.useContext();

    const { data, refetch } = trpc.state.searchAppliedRate.useQuery(
        {
            state: enteredState,
            propertyPrice: enteredPropertyPrice,
        },
        { enabled: false, refetchOnWindowFocus: false }
    );

    useEffect(() => {
        if (!data) {
            console.log("no data yet");
            return;
        }

        if (!enteredPropertyPrice) {
            console.log("no prop price entered");
            return;
        }

        setCalculatedRate(
            calculateTransferDuty(
                data.rate,
                data.base,
                data.rateType,
                data.rangeLow,
                enteredPropertyPrice
            )
        );
    }, [data, enteredPropertyPrice]);

    const handleCalculation = () => {
        utils.state.searchAppliedRate.invalidate();
        refetch();
    };

    return (
        <div className="align-center mx-auto flex w-full flex-col justify-center text-center">
            <h1 className="text-2xl font-bold">Real Affordable</h1>
            <p>Objective way to see how how affordable a property really is</p>
            <div className="flex h-10" />
            <div className="mx-auto flex flex-col justify-center gap-2">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <label className="text-lg">Property Price:</label>
                        <input
                            type="number"
                            className="rounded border border-solid p-2"
                            onChange={(e) =>
                                setEnteredPropertyPrice(
                                    e.currentTarget.valueAsNumber
                                )
                            }
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-lg">
                            Purchase State/Territory:
                        </label>
                        <select
                            className="rounded border border-solid p-2"
                            value={enteredState}
                            onChange={(e) =>
                                setEnteredState(e.currentTarget.value)
                            }
                        >
                            <option>WA</option>
                            <option>SA</option>
                            <option>NSW</option>
                            <option>VIC</option>
                            <option>QLD</option>
                            <option>NT</option>
                            <option>ACT</option>
                            <option>TAS</option>
                        </select>
                    </div>
                </div>
                <button
                    onClick={() => handleCalculation()}
                    className="rounded border border-solid p-2"
                >
                    Calculate
                </button>
                <p>Stamp Duty: {roundToNearest(calculatedRate)}</p>
            </div>
        </div>
    );
};

export default Home;
