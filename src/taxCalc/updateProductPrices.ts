import isSpecialPriceActive from './isSpecialPriceActive'
import createSinglePrice from './createSinglePrice'
import assignPrice from './assignPrice'

function updateProductPrices ({
  product,
  rate,
  sourcePriceInclTax = false,
  deprecatedPriceFieldsSupport = false,
  finalPriceInclTax = true
}) {
  const rate_factor = parseFloat(rate.rate) / 100
  const hasOriginalPrices = (
    product.original_price !== undefined &&
    product.original_final_price !== undefined &&
    product.original_special_price !== undefined
  )
  // build objects with original price and tax
  // for first calculation use `price`, for next one use `original_price`
  const priceWithTax = createSinglePrice(parseFloat(product.original_price || product.price), rate_factor, sourcePriceInclTax && !hasOriginalPrices)
  const finalPriceWithTax = createSinglePrice(parseFloat(product.original_final_price || product.final_price), rate_factor, finalPriceInclTax && !hasOriginalPrices)
  const specialPriceWithTax = createSinglePrice(parseFloat(product.original_special_price || product.special_price), rate_factor, sourcePriceInclTax && !hasOriginalPrices)

  // save original prices
  if (!hasOriginalPrices) {
    assignPrice({ product, target: 'original_price', ...priceWithTax, deprecatedPriceFieldsSupport })

    if (specialPriceWithTax.price) {
      product.original_special_price = specialPriceWithTax.price
    }

    if (finalPriceWithTax.price) {
      product.original_final_price = finalPriceWithTax.price
    }
  }

  // reset previous calculation
  assignPrice({ product, target: 'price', ...priceWithTax, deprecatedPriceFieldsSupport })

  if (specialPriceWithTax.price) {
    assignPrice({ product, target: 'special_price', ...specialPriceWithTax, deprecatedPriceFieldsSupport })
  }
  if (finalPriceWithTax.price) {
    assignPrice({ product, target: 'final_price', ...finalPriceWithTax, deprecatedPriceFieldsSupport })
  }

  if (product.final_price) {
    if (product.final_price < product.price) { // compare the prices with the product final price if provided; final prices is used in case of active catalog promo rules for example
      assignPrice({ product, target: 'price', ...finalPriceWithTax, deprecatedPriceFieldsSupport })
      if (product.special_price && product.final_price < product.special_price) { // for VS - special_price is any price lowered than regular price (`price`); in Magento there is a separate mechanism for setting the `special_prices`
        assignPrice({ product, target: 'price', ...specialPriceWithTax, deprecatedPriceFieldsSupport }) // if the `final_price` is lower than the original `special_price` - it means some catalog rules were applied over it
        assignPrice({ product, target: 'special_price', ...finalPriceWithTax, deprecatedPriceFieldsSupport })
      } else {
        assignPrice({ product, target: 'price', ...finalPriceWithTax, deprecatedPriceFieldsSupport })
      }
    }
  }

  if (product.special_price && (product.special_price < product.original_price)) {
    if (!isSpecialPriceActive(product.special_from_date, product.special_to_date)) {
      // out of the dates period
      assignPrice({ product, target: 'special_price', price: 0, tax: 0, deprecatedPriceFieldsSupport })
    } else {
      assignPrice({ product, target: 'price', ...specialPriceWithTax, deprecatedPriceFieldsSupport })
    }
  } else {
    // the same price as original; it's not a promotion
    assignPrice({ product, target: 'special_price', price: 0, tax: 0, deprecatedPriceFieldsSupport })
  }

  if (product.configurable_children) {
    for (const configurableChild of product.configurable_children) {
      if (configurableChild.custom_attributes) {
        for (const opt of configurableChild.custom_attributes) {
          configurableChild[opt.attribute_code] = opt.value
        }
      }

      // update children prices
      updateProductPrices({ product: configurableChild, rate, sourcePriceInclTax, deprecatedPriceFieldsSupport, finalPriceInclTax })

      if ((configurableChild.price_incl_tax <= product.price_incl_tax) || product.price === 0) { // always show the lowest price
        assignPrice({
          product,
          target: 'price',
          price: configurableChild.price,
          tax: configurableChild.price_tax,
          deprecatedPriceFieldsSupport
        })
        assignPrice({
          product,
          target: 'special_price',
          price: configurableChild.special_price,
          tax: configurableChild.special_price_tax,
          deprecatedPriceFieldsSupport
        })
      }
    }
  }
}

export default updateProductPrices
