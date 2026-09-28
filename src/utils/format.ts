/** Zero-pads a number, e.g. 3 -> "03". */
export const padNumber = (value: number, length = 2) => String(value).padStart(length, '0');
