import { axiosInstance } from 'plugins/axios'
import {
  // Loading,
  Notify
} from 'quasar'

export function register ({commit}, form) {
  return new Promise((resolve, reject) => {
    axiosInstance({
      data: {
        agreementChecked: form.agreementChecked,
        email: form.email,
        // gRecaptchaResponse: form.gRecaptchaResponse,
        password: form.password,
        passwordConfirmation: form.passwordConfirmation
      },
      method: 'post',
      url: 'register'
    })
      .then(response => {
        if (response.data.success) {
          const accessToken = response.data.accessToken
          const refreshToken = response.data.refreshToken
          // const expiresIn = response.data.expiresIn
          axiosInstance.defaults.headers.post['Authorization'] = `${response.data.tokenType} ${accessToken}`
          // axiosInstance.defaults.headers.common['Authorization'] = `${response.data.tokenType} ${accessToken}`
          localStorage.setItem('refresh_token', refreshToken)
          // localStorage.setItem('access_token', accessToken)
          commit('UPDATE_TOKEN', accessToken)
          resolve(response)
        }
        reject(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function login ({commit}, form) {
  return new Promise((resolve, reject) => {
    axiosInstance({
      data: {
        email: form.email,
        // gRecaptchaResponse: form.gRecaptchaResponse,
        password: form.password
      },
      method: 'post',
      url: 'login'
    })
      .then(response => {
        if (response.data.success) {
          const accessToken = response.data.accessToken
          const refreshToken = response.data.refreshToken
          // const expiresIn = response.data.expiresIn
          axiosInstance.defaults.headers.post['Authorization'] = `${response.data.tokenType} ${accessToken}`
          // axiosInstance.defaults.headers.common['Authorization'] = `${response.data.tokenType} ${accessToken}`
          localStorage.setItem('refresh_token', refreshToken)
          // localStorage.setItem('access_token', accessToken)
          commit('UPDATE_TOKEN', accessToken)
          resolve(response)
        }
        reject(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function refreshToken ({commit}) {
  return new Promise((resolve, reject) => {
    axiosInstance({
      data: {
        refreshToken: localStorage.getItem('refresh_token')
      },
      method: 'post',
      url: 'refresh'
    })
      .then(response => {
        if (response.data.success) {
          const accessToken = response.data.accessToken
          const refreshToken = response.data.refreshToken
          // const expiresIn = response.data.expiresIn
          axiosInstance.defaults.headers.post['Authorization'] = `${response.data.tokenType} ${accessToken}`
          localStorage.setItem('refresh_token', refreshToken)
          // localStorage.setItem('access_token', accessToken)
          commit('UPDATE_TOKEN', accessToken)
          resolve(response)
        }
        reject(response)
      })
      .catch(error => {
        localStorage.removeItem('refresh_token')
        commit('DESTROY_TOKEN')
        reject(error)
      })
  })
}

export function destroyToken (context) {
  // todo: delete
  // axiosInstance.defaults.headers.post['Authorization'] = 'Bearer ' + context.state.token
  // axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
  // axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
  // if (context.getters.loggedIn) {
  return new Promise((resolve, reject) => {
    axiosInstance({
      data: {
        refreshToken: localStorage.getItem('refresh_token')
      },
      method: 'post',
      url: 'logout'
      // headers: {
      // }
    })
      .then(response => {
        localStorage.removeItem('refresh_token')
        context.commit('DESTROY_TOKEN')
        Notify.create({
          icon: 'ion-thumbs-up',
          message: 'Успешный выход из панели управления.',
          timeout: 5000,
          type: 'positive'
        })
        resolve(response)
      })
      .catch(error => {
        localStorage.removeItem('refresh_token')
        context.commit('DESTROY_TOKEN')
        let message = error.response && error.response.status === 401
          ? 'Вы не вошли в личный кабинет.'
          : 'Ошибка при обращении к серверу.'
        Notify.create({
          icon: 'ion-alert',
          message: message,
          timeout: 5000,
          type: 'negative'
        })
        reject(error)
      })
  })
  // }
}

export function recovery ({commit}, form) {
  return new Promise((resolve, reject) => {
    axiosInstance({
      data: {
        form: form
      },
      method: 'post',
      url: 'recovery'
    })
      .then(response => {
        // const token = response.data.access_token
        // localStorage.setItem('access_token', token)
        // commit('UPDATE_TOKEN', token)
        // axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token
        Notify.create({
          icon: 'ion-thumbs-up',
          message: 'Инструкция по восстановлению пароля выслана на Ваш email.',
          timeout: 10000,
          type: 'positive'
        })
        resolve(response)
      })
      .catch(error => {
        let message = error.response ? error.response.data : null || 'Ошибка при обращении к серверу.'
        Notify.create({
          icon: 'ion-alert',
          message: message,
          timeout: 5000,
          type: 'negative'
        })
        // todo: удалить или заменить
        // const token = '0000000000000000000'
        // localStorage.setItem('access_token', token)
        // commit('UPDATE_TOKEN', token)
        // axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token
        Notify.create({
          icon: 'ion-thumbs-up',
          message: 'Инструкция по восстановлению пароля выслана на Ваш email.',
          timeout: 10000,
          type: 'positive'
        })
        // ^-- todo: удалить или заменить
        reject(error)
      })
  })
}

export function changePassword ({commit}, form) {
  return new Promise((resolve, reject) => {
    axiosInstance({
      data: {
        password: form.password,
        passwordConfirmation: form.passwordConfirmation,
        passwordOld: form.passwordOld
      },
      method: 'post',
      url: 'change-password'
    })
      .then(response => {
        // todo: удалить или сделать обновление токенов
        // const token = response.data.access_token
        // localStorage.setItem('access_token', token)
        // commit('UPDATE_TOKEN', token)
        // axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token
        Notify.create({
          icon: 'ion-thumbs-up',
          message: 'Пароль изменен успешно.',
          timeout: 10000,
          type: 'positive'
        })
        resolve(response)
      })
      .catch(error => {
        let message = error.response ? error.response.data : null || 'Ошибка при обращении к серверу.'
        Notify.create({
          icon: 'ion-alert',
          message: message,
          timeout: 5000,
          type: 'negative'
        })
        // todo: удалить или заменить
        // const token = '0000000000000000000'
        // localStorage.setItem('access_token', token)
        // commit('UPDATE_TOKEN', token)
        // axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token
        Notify.create({
          icon: 'ion-thumbs-up',
          message: 'Пароль изменен успешно.',
          timeout: 10000,
          type: 'positive'
        })
        // ^-- todo: удалить или заменить
        reject(error)
      })
  })
}
