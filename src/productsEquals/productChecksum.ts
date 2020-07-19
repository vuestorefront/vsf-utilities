import CartItem from './types/CartItem'
import getProductOptions from './getProductOptions'
import { SHA3 } from 'sha3'

const getDataToHash = (product: CartItem): any => {
  if (!product.product_option) {
    return null
  }

  const supportedProductOptions = ['bundle_options', 'custom_options', 'configurable_item_options']

  // returns first options that has array with options
  for (const optionName of supportedProductOptions) {
    const options = getProductOptions(product, optionName)
    if (options.length) {
      return options
    }
  }

  // if there are options that are not supported then just return all options
  return product.product_option
}

const productChecksum = (product: CartItem): string => {
  const hash = new SHA3(224)
  return  hash
    .update(JSON.stringify(getDataToHash(product)))
    .digest('hex')
}

export default productChecksum
