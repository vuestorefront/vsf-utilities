/**
 * Rounds a number to given decimal places
 * @param number - number to round
 * @param digits - amount of decimal places
 */
export default function roundTo(number: number, decimals: number) {
  if (decimals === undefined) {
    decimals = 0;
  }

  const multiplicator = Math.pow(10, decimals);
  number = parseFloat((number * multiplicator).toFixed(11));
  return Math.round(number) / multiplicator;
}
