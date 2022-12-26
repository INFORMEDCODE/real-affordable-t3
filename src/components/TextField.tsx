import React, { useRef } from "react";

const AdornmentPosition = {
    START: "start",
    END: "end",
} as const;

type TextField = {
    adornment?: string | React.ReactNode;
    adornmentPosition?: string;
};

const TextField: React.FC<
    TextField & React.InputHTMLAttributes<HTMLInputElement>
> = ({ adornment, adornmentPosition, ...props }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { className, value, ...rest } = props;

    return (
        <div
            className={`${className} ${rest.disabled ? "bg-zinc-50" : ""}`}
            onClick={() => (!rest.disabled ? inputRef.current?.focus() : null)}
        >
            {adornment && adornmentPosition == AdornmentPosition.START ? (
                <div>
                    <span>{adornment}</span>
                </div>
            ) : null}
            <div>
                <input
                    ref={inputRef}
                    value={
                        typeof value == "number"
                            ? value.toLocaleString()
                            : value
                    }
                    {...rest}
                    className="disabled:bg-zinc-50"
                />
            </div>
            {adornment && adornmentPosition == AdornmentPosition.END ? (
                <div>
                    <span>{adornment}</span>
                </div>
            ) : null}
        </div>
    );
};

export default TextField;
