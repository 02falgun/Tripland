/**
 * Mask a numeric price value to placeholder format.
 * Keeps the first 2 significant digits, replaces remaining digits with 'x'.
 * 
 * @example maskPriceNumber(48500) => "48xxx"
 * @example maskPriceNumber(4200) => "42xx"
 * @example maskPriceNumber(126000) => "12xxxx"
 */
export function maskPriceNumber(value: number): string {
  const str = String(value);
  let result = "";
  let digitCount = 0;
  for (const ch of str) {
    if (/\d/.test(ch)) {
      digitCount++;
      if (digitCount <= 2) {
        result += ch;
      } else {
        result += "x";
      }
    } else {
      result += ch;
    }
  }
  return result;
}

/**
 * Mask a price string that may include a currency prefix, commas, etc.
 * Preserves all non-digit characters (currency symbol, commas, spaces, etc.)
 * and replaces digits after the first 2 with 'x'.
 * 
 * @example maskPriceString("NPR 34,999") => "NPR 34,xxx"
 * @example maskPriceString("USD 499") => "USD 49x"
 * @example maskPriceString("NPR 9,500") => "NPR 9,5xx"
 */
export function maskPriceString(value: string): string {
  let digitCount = 0;
  let result = "";
  for (const ch of value) {
    if (/\d/.test(ch)) {
      digitCount++;
      if (digitCount <= 2) {
        result += ch;
      } else {
        result += "x";
      }
    } else {
      result += ch;
    }
  }
  return result;
}

/**
 * Universal mask function that handles both numbers and strings.
 * Numbers stay as-is (0 = "Price on Request" sentinel), strings get masked.
 */
export function maskPrice(value: number | string): string | number {
  if (typeof value === "number") {
    if (value === 0) return 0; // 0 = "Price on Request" sentinel
    return maskPriceNumber(value);
  }
  return maskPriceString(value);
}
