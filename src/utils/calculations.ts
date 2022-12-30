const calculatePartThereof = (
    rate: number,
    base: number,
    rangeLow: number,
    propertyPrice: number
) => {
    return ((propertyPrice - rangeLow) / 100) * rate + base;
};

const calculateFull = (rate: number, propertyPrice: number) => {
    return (propertyPrice / 100) * rate;
};

const calculateDutiablePercent = (
    rate: number,
    base: number,
    rangeLow: number,
    propertyPrice: number
) => {
    const rateAsPercent = rate / 100;
    return (propertyPrice - rangeLow) * rateAsPercent + base;
};

const calculateFullPercent = (rate: number, propertyPrice: number) => {
    const rateAsPercent = rate / 100;
    return propertyPrice * rateAsPercent;
};

const calculateCustomRate = (propertyPrice: number, equation: string) => {
    return Function(
        `'use strict'; return (${equation.replaceAll(
            "PROP_PRICE",
            propertyPrice.toString()
        )})`
    )();
};

export const calculateRealLoanValue = (
    initialLoanAmount: number,
    lmiPremium: number,
    transferDuty?: number
) => {
    return initialLoanAmount + (transferDuty ? transferDuty : 0) + lmiPremium;
};

export const calculateLMIPremium = (loanAmount: number, rate: number) => {
    const rateAsPercent = rate / 100;
    return loanAmount * rateAsPercent;
};

export const calculateTransferDuty = (
    rate: number,
    base: number,
    rateType: string,
    rangeLow: number,
    propertyPrice: number,
    equation?: string
) => {
    if (rateType == "partThereof") {
        return calculatePartThereof(rate, base, rangeLow, propertyPrice);
    }
    if (rateType == "dutiablePercent") {
        return calculateDutiablePercent(rate, base, rangeLow, propertyPrice);
    }
    if (rateType == "full") {
        return calculateFull(rate, propertyPrice);
    }
    if (rateType == "fullPercent") {
        return calculateFullPercent(rate, propertyPrice);
    }
    if (rateType == "custom" && equation) {
        return calculateCustomRate(propertyPrice, equation);
    }
};

export const roundToNearest = (inputValue: number) => {
    return Math.round(inputValue);
};
