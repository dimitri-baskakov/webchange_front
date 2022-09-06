import { axiosInstance } from 'plugins/axios'

export function getUserInfo ({commit}) {
  return new Promise((resolve, reject) => {
    // axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${store.getters['auth/accessToken']}`
    axiosInstance({
      method: 'get',
      url: 'user-info'
    })
      .then(response => {
        if (response.data.success) {
          commit('UPDATE_USER_INFO', response.data.user)
          resolve(response)
        }
        reject(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function addUserWallet ({commit}, wallet) {
  return new Promise((resolve, reject) => {
    // axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${store.getters['auth/accessToken']}`
    axiosInstance({
      data: {
        walletId: wallet.walletId,
        walletCurrency: wallet.currency
      },
      method: 'put',
      url: 'wallet'
    })
      .then(response => {
        if (response.data.success) {
          commit('ADD_USER_WALLET', response.data.wallet || {
            walletId: wallet.walletId,
            currency: wallet.currency,
            name: ''
          })
          resolve(response)
        }
        reject(response)
      })
      .catch(error => {
        // commit('ADD_USER_WALLET', wallet)
        reject(error)
      })
  })
}

export function editUserWallet ({commit}, payload) {
  return new Promise((resolve, reject) => {
    // axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${store.getters['auth/accessToken']}`
    axiosInstance({
      data: {
        id: payload.wallet.id,
        field: payload.field,
        value: payload.wallet[payload.field]
      },
      method: 'post',
      url: 'wallet'
    })
      .then(response => {
        if (response.data.success) {
          commit('UPDATE_USER_WALLET', payload.wallet, payload.field)
          resolve(response)
        }
        reject(response)
      })
      .catch(error => {
        // commit('UPDATE_USER_WALLET', wallet)
        reject(error)
      })
  })
}

export function removeUserWallet ({commit}, id) {
  return new Promise((resolve, reject) => {
    // axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${store.getters['auth/accessToken']}`
    axiosInstance({
      data: {
        id: id
      },
      method: 'delete',
      url: 'wallet'
    })
      .then(response => {
        if (response.data.success) {
          commit('REMOVE_USER_WALLET', id)
          resolve(response)
        }
        reject(response)
      })
      .catch(error => {
        // commit('REMOVE_USER_WALLET', wallet)
        reject(error)
      })
  })
}

export function updateExchangeRequest ({commit}, exchangeRequest) {
  return new Promise((resolve, reject) => {
    commit('UPDATE_EXCHANGE_REQUEST', exchangeRequest)
    resolve(exchangeRequest)
    // axiosInstance({
    //   data: {
    //     exchangeFromKey: exchangeRequest.exchangeFrom.activeCurrency.key,
    //     exchangeFromAmount: exchangeRequest.exchangeFrom.activeCurrency.amount,
    //     exchangeToKey: exchangeRequest.exchangeTo.activeCurrency.key,
    //     exchangeToAmount: exchangeRequest.exchangeTo.activeCurrency.amount
    //   },
    //   method: 'post',
    //   url: 'exchange-request'
    // })
    //   .then(response => {
    //     if (response.data.success) {
    //       commit('UPDATE_EXCHANGE_REQUEST', exchangeRequest)
    //       resolve(response)
    //     }
    //     reject(response)
    //   })
    //   .catch(error => {
    //     // commit('REMOVE_USER_WALLET', wallet)
    //     reject(error)
    //   })
  })
}

export function exchangeRequest ({commit}, exchangeRequest) {
  return new Promise((resolve, reject) => {
    axiosInstance({
      data: {
        exchangeFromKey: exchangeRequest.exchangeFrom.activeCurrency.key,
        exchangeFromAmount: exchangeRequest.exchangeFrom.activeCurrency.amount,
        exchangeToKey: exchangeRequest.exchangeTo.activeCurrency.key,
        exchangeToAmount: exchangeRequest.exchangeTo.activeCurrency.amount
      },
      method: 'post',
      url: 'exchange-request'
    })
      .then(response => {
        if (response.data.success) {
          commit('UPDATE_EXCHANGE_REQUEST', exchangeRequest)
          resolve(response)
        }
        reject(response)
      })
      .catch(error => {
        // commit('REMOVE_USER_WALLET', wallet)
        reject(error)
      })
  })
}

export function getRates ({commit}) {
  return new Promise((resolve, reject) => {
    axiosInstance({
      method: 'get',
      url: `rates`
    })
      .then(response => {
        if (response) {
          commit('UPDATE_RATES', response.data)
          resolve(response.data)
        } else {
          reject(response)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function updateMetaTitle ({commit}, metaTitle) {
  commit('UPDATE_META_TITLE', metaTitle)
}
