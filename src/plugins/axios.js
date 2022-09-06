import axios from 'axios'

const axiosInstance = axios.create({
  // baseURL: 'http://webchange.org'
  baseURL: 'https://webchange.org/api/v1/'
})

export default ({ Vue, store }) => {
  // todo: в таком виде заголовок отправляется всегда, пока не обновить приложение. не работает?
  // console.log(store.getters['auth/loggedIn'])
  // console.log(`Bearer ${store.getters['auth/accessToken']}`)
  // if (store.getters['auth/loggedIn']) {
  //   console.log(`Bearer ${store.getters['auth/accessToken']}`)
  //   axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${store.getters['auth/accessToken']}`
  // }
  // удалить - тестирование без апи
  // axiosInstance.interceptors.request.use(config => {
  // }
  axiosInstance.interceptors.response.use(
    undefined,
    error => {
      console.log('=============  refresh-token  ===================')
      const originalRequest = error.config
      // if (!store.getters['auth/loggedIn'] || (error.response.status === 401 && !originalRequest._retry)) {
      // if (error.response.status === 500 && !originalRequest._retry) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        store.dispatch('auth/refreshToken')
          .then(() => {
            // todo или удалить
            // здесь после успешного рефреша токенов надо повторный запрос сделать туда, откуда пришел 401
            return Promise.reject(error)
          })
      }
      return Promise.reject(error)
    }
  )
  /**/
  axiosInstance.interceptors.response.use(
    undefined,
    error => {
      console.log('+++axios-start-error+++')
      console.log(error)
      console.log('+++axios-end-error+++')
      return Promise.resolve({
        data: {
          success: true,
          // message: 'Вы успешно зарегистрировались в системе.',
          // tokenType: 'Bearer',
          // expiresIn: '3000.0',
          // accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMCwidXNlcm5hbWUiOiJ0ZXN0ZXIyM0B5YW5kZXgucnUiLCJleHAiOjE1NDQyMDg1ODIsImVtYWlsIjoidGVzdGVyMjNAeWFuZGV4LnJ1Iiwib3JpZ19pYXQiOjE1NDQyMDU1ODJ9.5UdKeHlUl45R71G9vixpBin2mPqe9-5H6PnWyFU8tsE',
          // refreshToken: 'ff958e4baa4263163e07a59c69125fccac751672',
          user: {
            userReferral: {
              reference: 'https://webchange.org/dde4v5t45t35t54tc44gfcerg345t',
              accruals: [
                {
                  amount: {
                    currencyFrom: 'LTC',
                    currencyTo: 'RUB',
                    valueFrom: 0.59,
                    valueTo: 1951.76
                  },
                  currencyFrom: 'LTC',
                  currencyTo: 'ALFA',
                  date: '12.12.2018',
                  id: 1,
                  payment: {
                    currency: 'USD',
                    value: 12
                  },
                  referralEmail: 'test@test.test'
                },
                {
                  amount: {
                    currencyFrom: 'LTC',
                    currencyTo: 'RUB',
                    valueFrom: 0.59,
                    valueTo: 1951.76
                  },
                  currencyFrom: 'LTC',
                  currencyTo: 'ALFA',
                  date: '12.12.2018',
                  id: 14,
                  payment: {
                    currency: 'USD',
                    value: 11
                  },
                  referralEmail: 'test@test.test'
                },
                {
                  amount: {
                    currencyFrom: 'LTC',
                    currencyTo: 'RUB',
                    valueFrom: 0.59,
                    valueTo: 1951.76
                  },
                  currencyFrom: 'LTC',
                  currencyTo: 'ALFA',
                  date: '12.12.2018',
                  id: 13,
                  payment: {
                    currency: 'USD',
                    value: 14
                  },
                  referralEmail: 'test@test.test'
                }
              ],
              linkClicks: 163,
              profits: [
                {
                  currency: 'ALFA',
                  date: '12.12.2018',
                  id: 1,
                  payment: {
                    currency: 'USD',
                    value: 22
                  },
                  walletId: '1556 4648 9123 2568'
                },
                {
                  currency: 'ALFA',
                  date: '12.12.2018',
                  id: 2,
                  payment: {
                    currency: 'USD',
                    value: 22
                  },
                  walletId: '1556 4648 9123 2568'
                }
              ],
              referrals: [
                {
                  email: 'test@test.test'
                },
                {
                  email: 'test@test.test'
                },
                {
                  email: 'test@test.test'
                },
                {
                  email: 'test@test.test'
                },
                {
                  email: 'test@test.test'
                },
                {
                  email: 'test@test.test'
                },
                {
                  email: 'test@test.test'
                },
                {
                  email: 'test@test.test'
                },
                {
                  email: 'test@test.test'
                },
                {
                  email: 'test@test.test'
                },
                {
                  email: 'test@test.test'
                },
                {
                  email: 'test@test.test'
                },
                {
                  email: 'test@test.test'
                },
                {
                  email: 'test@test.test'
                },
                {
                  email: 'test@test.test'
                },
                {
                  email: 'test@test.test'
                }
              ]
            },
            userWallets: [
              {
                id: 1,
                name: '',
                currency: 'BTC',
                walletId: '1352316156138486'
              },
              {
                id: 2,
                name: '',
                currency: 'BTC',
                walletId: '1352316156138456'
              },
              {
                id: 3,
                name: '',
                currency: 'LTC',
                walletId: '1347864547743578'
              },
              {
                id: 4,
                name: '',
                currency: 'ETH',
                walletId: '434895jhkj3489'
              },
              {
                id: 34,
                name: '',
                currency: 'ALFA',
                walletId: '1556 4648 9123 2568'
              },
              {
                id: 344,
                name: '',
                currency: 'XEM',
                walletId: 'n3t673267t337'
              },
              {
                id: 56,
                name: '',
                currency: 'XRP',
                walletId: 'n3t673267t337'
              },
              {
                id: 78,
                name: '',
                currency: 'XMR',
                walletId: 'n3t673267t337'
              },
              {
                id: 23,
                name: '',
                currency: 'VTB',
                walletId: '1234 4568 1548 1368',
                recipientName: 'Asdf Osdwe'
              },
              {
                id: 76,
                name: '',
                currency: 'QIWI',
                walletId: 'n3t673267t337'
              },
              {
                id: 12,
                name: '',
                currency: 'VSMC',
                walletId: 'n3t673267t337'
              }
            ],
            userWalletsHistories: [
              {
                addressFrom: 'LgWtB9V2zQ5VexdF9VkiAimKwyyRf1Fjd7',
                addressTo: '1234 5432 5678 4509',
                amount: {
                  currencyFrom: 'LTC',
                  currencyTo: 'RUB',
                  rateFrom: 1,
                  rateTo: 3308.07,
                  valueFrom: 0.59,
                  valueTo: 1951.76
                },
                currencyFrom: 'LTC',
                currencyTo: 'ALFA',
                createdAt: '12.12.2018 11:02',
                completedAt: '',
                id: 2,
                requestNumber: '2389',
                status: 'В работе'
                // walletId: '23783456230840230'
              },
              {
                addressFrom: '12pe45kGqQhP4zzf4PFLfSpAKoWGVF3gq2',
                addressTo: 'Xfh68Ai8z2Nr8BnjZCHQ4XzV51jhJp24eb',
                amount: {
                  currencyFrom: 'BTC',
                  currencyTo: 'DASH',
                  rateFrom: 1,
                  rateTo: 41.3266858,
                  valueFrom: 0.001,
                  valueTo: 0.0413267
                },
                currencyFrom: 'BTC',
                currencyTo: 'DASH',
                createdAt: '06.12.2018 18:56',
                completedAt: '06.12.2018 20:10',
                id: 1,
                requestNumber: '2378',
                status: 'Выполнена'
                // walletId: 'fjt5489584fg'
              }
            ]
          }
        }
      })
    }
  )
  /**/
  axiosInstance.defaults.headers.common['Content-Type'] = 'Application/json'
  Vue.prototype.$axios = axiosInstance
}

export { axiosInstance }
