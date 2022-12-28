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
    propertyPrice: number
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
};

export const roundToNearest = (inputValue: number) => {
    return Math.round(inputValue);
};
