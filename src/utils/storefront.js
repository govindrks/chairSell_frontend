const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export function formatCurrency(value) {
  return currencyFormatter.format(value)
}

export function getDiscount(product) {
  return Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  )
}
