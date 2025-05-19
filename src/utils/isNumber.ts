export const isNumber = (n: string) => !isNaN(parseFloat(n)) && isFinite(n);
