export function currencies (state) {
  return state.currencies
}

// только те валюты, которые пришли от сервера по апи с конечной точки rates
export function currenciesWithRates (state) {
  // return state.currencies
  let allCurrencies = state.currencies
  let presentInRatesCurrencies = Object.keys(state.rates.PRICES ? state.rates.PRICES : {})
  // todo: удалить. для теста
  // let presentInRatesCurrencies = ['SBER', 'VSMC', 'VTB', 'QIWI', 'ALFA', 'ETH', 'BTC', 'ZEC', 'ETC', 'LTC', 'DASH']
  return Object.keys(allCurrencies)
    .filter(key => presentInRatesCurrencies.includes(key))
    .reduce((obj, key) => {
      obj[key] = allCurrencies[key]
      return obj
    }, {})
}

export function currenciesCards (state) {
  return state.currenciesCards
}

export function user (state) {
  return state.user
}

export function userReferral (state) {
  return state.user.userReferral || {}
}

export function userWallets (state) {
  return state.user.userWallets || []
}

export function userWalletsHistories (state) {
  return state.user.userWalletsHistories || []
}

export function exchangeRequest (state) {
  return state.exchangeRequest
}

export function metaTitle (state) {
  return state.meta.title
}

export function sections (state) {
  return state.sections
}

export function rates (state) {
  return state.rates
}
