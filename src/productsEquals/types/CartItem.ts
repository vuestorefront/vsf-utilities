import CartItemOptions from './CartItemOptions'

export default interface ProductEqualCartItem {
  sku: string | number,
  item_id: number | string,
  server_item_id?: number | string,
  checksum?: string,
  product_option?: CartItemOptions,
  [key: string]: any
}
