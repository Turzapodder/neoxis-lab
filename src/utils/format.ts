/** Zero-pads a number, e.g. 3 -> "03". */
export const padNumber = (value: number, length = 2) => String(value).padStart(length, '0');

/** Drops quote marks wrapping a whole string, for copy stored as `"..."` but set with its own quote styling. */
export const stripQuotes = (text: string) => text.replace(/^["“]\s*|\s*["”]$/g, '');
