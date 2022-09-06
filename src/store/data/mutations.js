export function UPDATE_USER_INFO (state, user) {
  state.user = user
}

export function ADD_USER_WALLET (state, wallet) {
  state.user.userWallets.push(wallet)
}

export function UPDATE_USER_WALLET (state, wallet, field) {
  state.user.userWallets.filter(userWallet => {
    return userWallet.id === wallet.id
  })[field] = wallet[field]
}

export function REMOVE_USER_WALLET (state, id) {
  state.user.userWallets = state.user.userWallets.filter(userWallet => {
    return userWallet.id !== id
  })
}

export function UPDATE_EXCHANGE_REQUEST (state, exchangeRequest) {
  state.exchangeRequest = {
    exchangeFromKey: exchangeRequest.exchangeFrom.activeCurrency.key,
    exchangeFromAmount: exchangeRequest.exchangeFrom.activeCurrency.amount,
    exchangeToKey: exchangeRequest.exchangeTo.activeCurrency.key,
    exchangeToAmount: exchangeRequest.exchangeTo.activeCurrency.amount,
    paymentWallet: '16813023646135135',
    paymentCard: '1234 5678 1234 5678',
    paymentPurpose: 'личный перевод',
    paymentDestinationTag: '1543578459',
    paymentPaymentId: '1234',
    paymentMessage: '1234'
  }
}

export function UPDATE_META_TITLE (state, metaTitle) {
  state.meta.title = metaTitle
}

export function UPDATE_RATES (state, rates) {
  state.rates = rates
}
