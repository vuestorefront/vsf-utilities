export default function isSpecialPriceActive (fromDate, toDate) {
  if (!fromDate && !toDate) {
    return true
  }

  const now = new Date()
  fromDate = fromDate ? new Date(fromDate) : false
  toDate = toDate ? new Date(toDate) : false

  if (fromDate && toDate) {
    return fromDate < now && toDate > now
  }

  if (fromDate && !toDate) {
    return fromDate < now
  }

  if (!fromDate && toDate) {
    return toDate > now
  }
}
