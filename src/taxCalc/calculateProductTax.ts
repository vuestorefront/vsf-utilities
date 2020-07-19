import updateProductPrices from './updateProductPrices'

function calculateProductTax ({ product, taxClasses, taxCountry = 'PL', taxRegion = '', sourcePriceInclTax = false, deprecatedPriceFieldsSupport = false, finalPriceInclTax = true, userGroupId = null, isTaxWithUserGroupIsActive }) {
  let rateFound = false
  const product_tax_class_id = parseInt(product.tax_class_id)
  if (product_tax_class_id > 0) {
    let taxClass
    if (isTaxWithUserGroupIsActive) {
      taxClass = taxClasses.find((el) =>
        el.product_tax_class_ids.indexOf(product_tax_class_id) >= 0 &&
          el.customer_tax_class_ids.indexOf(userGroupId) >= 0
      )
    } else {
      taxClass = taxClasses.find((el) => el.product_tax_class_ids.indexOf(product_tax_class_id) >= 0)
    }

    if (taxClass) {
      for (const rate of taxClass.rates) { // TODO: add check for zip code ranges (!)
        if (rate.tax_country_id === taxCountry && (rate.region_name === taxRegion || rate.tax_region_id === 0 || !rate.region_name)) {
          updateProductPrices({ product, rate, sourcePriceInclTax, deprecatedPriceFieldsSupport, finalPriceInclTax })
          rateFound = true
          break
        }
      }
    }
  }
  if (!rateFound) {
    updateProductPrices({ product, rate: { rate: 0 }, sourcePriceInclTax, deprecatedPriceFieldsSupport, finalPriceInclTax })

    product.price_incl_tax = product.price
    product.price_tax = 0
    product.special_price_incl_tax = 0
    product.special_price_tax = 0

    if (deprecatedPriceFieldsSupport) {
      /** BEGIN @deprecated - inconsitent naming kept just for the backward compatibility */
      product.priceInclTax = product.price
      product.priceTax = 0
      product.specialPriceInclTax = 0
      product.specialPriceTax = 0
      /** END */
    }

    if (product.configurable_children) {
      for (const configurableChildren of product.configurable_children) {
        configurableChildren.price_incl_tax = configurableChildren.price
        configurableChildren.price_tax = 0
        configurableChildren.special_price_incl_tax = 0
        configurableChildren.special_price_tax = 0

        if (deprecatedPriceFieldsSupport) {
          /** BEGIN @deprecated - inconsitent naming kept just for the backward compatibility */
          configurableChildren.priceInclTax = configurableChildren.price
          configurableChildren.priceTax = 0
          configurableChildren.specialPriceInclTax = 0
          configurableChildren.specialPriceTax = 0
          /** END */
        }
      }
    }
  }
  return product
}

export default calculateProductTax
