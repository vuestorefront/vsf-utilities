import roundTo from './roundTo';

/**
 * Create price object with base price and tax
 * @param price - product price which is used to extract tax value
 * @param rateFactor - tax % in decimal
 * @param isPriceInclTax - determines if price already include tax
 */
function createSinglePrice(
  price: number,
  rateFactor: number,
  isPriceInclTax: boolean,
) {
  const _price = isPriceInclTax ? price / (1 + rateFactor) : price;
  const tax = _price * rateFactor;

  return { price: roundTo(_price, 2), tax: roundTo(tax, 2) };
}

export default createSinglePrice;
