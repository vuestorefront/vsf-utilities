interface BundleOptions {
  option_id: number,
  option_qty: number,
  option_selections: number[]
}

interface ConfigurableItemOptions {
  label: string,
  option_id: string,
  option_value: string,
  value: string
}

export default interface CartItemOptions {
  extension_attributes: {
    custom_options: any[],
    configurable_item_options: ConfigurableItemOptions[],
    bundle_options: BundleOptions[]
  }
}
