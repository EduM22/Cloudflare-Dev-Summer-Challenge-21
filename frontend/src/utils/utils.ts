import { store } from '../store/store'

export function displayToCurrency(params: { number: number }) {
  const currency = store.getters.getCurrency
  const country = 'en-US' // TODO: change this to be dynamic
  return new Intl.NumberFormat(country, {
    style: 'currency',
    currency: currency,
  }).format(params.number)
}
