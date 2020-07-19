export default interface AssignPriceParams {
  product: any,
  target: string,
  price: number,
  tax?: number,
  deprecatedPriceFieldsSupport?: boolean
}
