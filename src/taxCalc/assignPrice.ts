import { camelCase } from '../lodash/lodash.custom.min'
import AssignPriceParams from './types/AssignPriceParams'

/**
 * change object keys to camelCase
 */
function toCamelCase (obj: Record<string, any> = {}): Record<string, any> {
  return Object.keys(obj).reduce((accObj, currKey) => {
    accObj[camelCase(currKey)] = obj[currKey]
    return accObj
  }, {})
}

/**
 * assign price and tax to product with proper keys
 * @param AssignPriceParams
 */
function assignPrice ({
  product,
  target,
  price,
  tax = 0,
  deprecatedPriceFieldsSupport = true
}: AssignPriceParams): void {
  let priceUpdate = {
    [target]: price,
    [`${target}_tax`]: tax,
    [`${target}_incl_tax`]: price + tax
  }

  if (deprecatedPriceFieldsSupport) {
    /** BEGIN @deprecated - inconsitent naming kept just for the backward compatibility */
    priceUpdate = Object.assign(priceUpdate, toCamelCase(priceUpdate))
    /** END */
  }

  Object.assign(product, priceUpdate)
}

export default assignPrice
