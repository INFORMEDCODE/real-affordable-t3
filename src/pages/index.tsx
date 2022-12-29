import { type NextPage } from "next";
import { useState } from "react";
import CalculatedBlock from "../components/CalculatedBlock";
import TextField from "../components/shared/TextField";

const Home: NextPage = () => {
    const [enteredState, setEnteredState] = useState<string>("WA");
    const [enteredDeposit, setEnteredDeposit] = useState<number>(0);
    const [enteredPropertyPrice, setEnteredPropertyPrice] = useState<number>(0);
    const [showCalculated, setShowCalculated] = useState<boolean>(false);

    return (
        <div className="align-center mx-auto flex w-full flex-col justify-center text-center">
            <h1 className="text-2xl font-bold">Real Affordable</h1>
            <p>Objective way to see how how affordable a property really is</p>
            <div className="flex h-10" />
            <div className="mx-auto flex flex-col justify-center gap-2">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <label className="text-lg">Property Price:</label>
                        <TextField
                            className="flex items-center border border-solid p-2"
                            type="number"
                            onChange={(e) =>
                                setEnteredPropertyPrice(
                                    e.currentTarget.valueAsNumber
                                )
                            }
                            adornment="$"
                            adornmentPosition="start"
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
                <div className="flex items-center gap-2">
                    <label className="text-lg">Deposit Amount:</label>
                    <TextField
                        className="flex items-center border border-solid p-2"
                        type="number"
                        onChange={(e) =>
                            setEnteredDeposit(e.currentTarget.valueAsNumber)
                        }
                        adornment="$"
                        adornmentPosition="start"
                    />
                </div>
                <button
                    className="rounded border border-solid p-2"
                    onClick={() => setShowCalculated(true)}
                >
                    Calculate
                </button>
                {showCalculated ? (
                    <>
                        <CalculatedBlock
                            deposit={enteredDeposit}
                            propertyPrice={enteredPropertyPrice}
                            state={enteredState}
                        />
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default Home;
