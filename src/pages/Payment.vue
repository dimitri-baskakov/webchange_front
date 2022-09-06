<template>
  <q-page
    class="bg-tertiary"
    padding
    style="max-width: 1350px; margin: 0 auto;"
  >
    <div class="row justify-center">
      <div
        class="col-xs-11 col-sm-8 col-md-6 col-lg-5 col-xl-4"
        style="line-height: 1.65"
      >
        <h3
          class="text-bold text-secondary text-center q-mt-none"
          style="font-size: 140%;"
        >
          {{ pageTitle }}
        </h3>
        <div
          class="text-grey-8"
        >
          <form
            @submit.prevent="sendRequest"
            action="#"
            class="container text-center"
          >
            <p class="text-bold q-my-lg">
              {{ countdown.minutes }} : {{ countdown.seconds }}
            </p>
            <div class="row bg-white round-borders q-mb-sm q-px-md q-py-sm">
              <div
                :class="{'flex flex-center' : $q.screen.gt.xs}"
                class="col"
              >
                <img
                  :src="exchangeRequest.exchangeFromKey ? `statics/images/logos/${currencies[exchangeRequest.exchangeFromKey].img}` : `statics/images/logos/${currencies['BTC'].img}`"
                  size="27px"
                >&nbsp;
                <br v-if="$q.screen.xs">
                {{ exchangeRequest && exchangeRequest.exchangeFromAmount }}
                {{ currenciesCards.indexOf(exchangeRequest.exchangeFromKey) !== -1 ? 'RUB' : exchangeRequest && exchangeRequest.exchangeFromKey }}
              </div>
              <div class="col-2 flex flex-center">
                <q-icon
                  class="q-mx-md"
                  name="ion-arrow-round-forward"
                  size="30px"
                ></q-icon>
              </div>
              <div
                :class="{'flex flex-center' : $q.screen.gt.xs}"
                class="col"
              >
                <img
                  :src="exchangeRequest.exchangeToKey ? `statics/images/logos/${currencies[exchangeRequest.exchangeToKey].img}` : `statics/images/logos/${currencies['BTC'].img}`"
                  size="27px"
                >&nbsp;
                <br v-if="$q.screen.xs">
                {{ exchangeRequest && exchangeRequest.exchangeToAmount }} {{ currenciesCards.indexOf(exchangeRequest.exchangeToKey) !== -1 ? 'RUB' : exchangeRequest && exchangeRequest.exchangeToKey }}
              </div>
            </div>
            <p class="text-bold q-mt-lg">
              Сделайте перевод по следующим реквизитам:
            </p>
            <div class="row bg-white round-borders q-mb-sm q-px-md q-py-md">
              <div class="col">
                <p
                  class="q-ma-none text-left"
                >
                  <strong>Сумма: </strong> {{ exchangeRequest && exchangeRequest.exchangeFromAmount }} {{ currenciesCards.indexOf(exchangeRequest.exchangeFromKey) !== -1 ? 'RUB' : exchangeRequest && exchangeRequest.exchangeFromKey }}
                </p>
                <p
                  class="q-ma-none text-left"
                  v-if="exchangeRequest && currenciesCards.indexOf(exchangeRequest.exchangeFromKey) === -1"
                >
                  <strong>Кошелёк: </strong> {{ exchangeRequest && exchangeRequest.paymentWallet }}
                </p>
                <p
                  class="q-ma-none text-left"
                  v-if="exchangeRequest && currenciesCards.indexOf(exchangeRequest.exchangeFromKey) !== -1"
                >
                  <strong>Номер карты: </strong>{{ exchangeRequest && exchangeRequest.paymentCard }}
                </p>
                <p
                  class="q-ma-none text-left"
                  v-if="1"
                >
                  <strong>Назначение: </strong> {{ exchangeRequest && exchangeRequest.paymentPurpose }}
                </p>
                <p
                  class="q-ma-none text-left"
                  v-if="exchangeRequest && exchangeRequest.exchangeFromKey === 'XRP'"
                >
                  <strong>Destination tag: </strong> {{ exchangeRequest && exchangeRequest.paymentDestinationTag }}
                </p>
                <p
                  class="q-ma-none text-left"
                  v-if="exchangeRequest && exchangeRequest.exchangeFromKey === 'XMR'"
                >
                  <strong>Payment ID: </strong> {{ exchangeRequest && exchangeRequest.paymentPaymentId }}
                </p>
                <p
                  class="q-ma-none text-left"
                  v-if="exchangeRequest && exchangeRequest.exchangeFromKey === 'XEM'"
                >
                  <strong>Message: </strong> {{ exchangeRequest && exchangeRequest.paymentMessage }}
                </p>
              </div>
            </div>
            <p class="text-bold q-mt-lg">
              Для окончания формирования заявки нажмите кнопку «Я оплатил»
            </p>
            <q-btn
              class="q-mt-sm q-py-sm q-px-md uppercase"
              color="secondary"
              size="lg"
              type="submit"
            >
              <span class="q-subheading text-bold">
                Я оплатил
              </span>
            </q-btn>
            <q-btn
              @click="cancelRequest"
              class="q-mt-sm q-py-sm q-px-md q-mx-md uppercase"
              color="grey"
              size="lg"
            >
              <span class="q-subheading text-bold">
                Отмена
              </span>
            </q-btn>
          </form>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  computed: {
    currencies: function () {
      return this.$store.getters['data/currenciesWithRates']
    },
    currenciesCards: function () {
      return this.$store.getters['data/currenciesCards']
    },
    exchangeRequest: function () {
      return this.$store.getters['data/exchangeRequest']
    },
    form () {
      return {
        exchangeFrom: this.exchangeFrom,
        exchangeTo: this.exchangeTo
      }
    },
    loggedIn: function () {
      return this.$store.getters['auth/loggedIn']
    },
    pageTitle () {
      return this.$store.getters['data/metaTitle']
    },
    rates () {
      return this.$store.getters['data/rates']
    }
  },
  created () {
    // this.getRates()
    this.$store.dispatch('data/getRates')
      .then(response => {
      })
      .catch(error => {
        console.log(error)
        this.$q.notify({
          icon: 'ion-warning',
          message: 'не удалось получить курсы валют',
          timeout: 5000
        })
      })
  },
  data: () => ({
    countdown: {
      minutes: 0,
      seconds: 0
    },
    exchangeFrom: {
      activeCurrency: {
        key: '',
        amount: null
      },
      bankName: '',
      destinationTag: '',
      message: '',
      paymentId: '',
      senderEmail: '',
      senderName: '',
      senderWallet: '',
      withoutDestinationTag: false,
      withoutMessage: false,
      withoutPaymentId: false
    },
    exchangeTo: {
      activeCurrency: {
        key: '',
        amount: null
      },
      agreementChecked: false,
      bankName: '',
      destinationTag: '',
      gRecaptchaResponse: '',
      message: '',
      paymentId: '',
      recipientEmail: '',
      recipientName: '',
      recipientWallet: '',
      withoutDestinationTag: false,
      withoutMessage: false,
      withoutPaymentId: false
    }
    // rates: {}
  }),
  methods: {
    cancelRequest () {
      this.$router.push('/filling-in-requisites')
    },
    countdownStart () {
      let endDate = new Date().getTime() + 880000
      setInterval(() => {
        this.calculateTime(endDate)
      }, 1000)
    },
    calculateTime (endDate) {
      let minutes, seconds
      let startDate = new Date()
      startDate = startDate.getTime()
      let timeRemaining = parseInt((endDate - startDate) / 1000)
      if (timeRemaining >= 0) {
        minutes = parseInt(timeRemaining / 60)
        timeRemaining = (timeRemaining % 60)
        seconds = parseInt(timeRemaining)
        this.countdown.minutes = ('0' + minutes).slice(-2)
        this.countdown.seconds = ('0' + seconds).slice(-2)
      } else {
        return 0
      }
    },
    // getRates () {
    //   return new Promise((resolve, reject) => {
    //     this.$axios({
    //       method: 'get',
    //       url: `rates`
    //     })
    //       .then(response => {
    //         if (response) {
    //           this.rates = response.data
    //           resolve(response.data)
    //         }
    //       })
    //       .catch(error => {
    //         console.log(error)
    //         this.$q.notify({
    //           icon: 'ion-warning',
    //           message: 'не удалось получить курсы валют',
    //           timeout: 5000
    //         })
    //         reject(error)
    //       })
    //   })
    // },
    getUserInfo () {
      this.$store.dispatch('data/getUserInfo')
        .then(undefined, error => {
          if (error.response.status >= 500) {
            this.$q.notify({
              icon: 'ion-alert',
              message: 'Не удалось получить информацию. Ошибка сервера.',
              timeout: 7000,
              type: 'negative'
            })
            return
          }
          let messages = Array.from(Object.values(error.response.data)).flat()
          messages.forEach(function (message) {
            if (typeof message === 'string') {
              this.$q.notify({
                icon: 'ion-alert',
                message: message,
                timeout: 7000,
                type: 'negative'
              })
            }
          }.bind(this))
        })
    },
    sendRequest () {
      this.$store.dispatch('data/exchangeRequest', this.form)
        .then(response => {
          this.$q.notify({
            icon: 'ion-thumbs-up',
            message: response.data.message || 'Заявка принята в работу. Информация отправлена на Ваш email.',
            timeout: 7000,
            type: 'positive'
          })
          if (this.loggedIn) {
            this.$router.push('/personal-area/history')
          } else {
            this.$router.push('/')
          }
        }, error => {
          if (error.response.status >= 500) {
            this.$q.notify({
              icon: 'ion-alert',
              message: 'Отправить заявку не удалось. Ошибка сервера.',
              timeout: 7000,
              type: 'negative'
            })
            return
          }
          let messages = Array.from(Object.values(error.response.data)).flat()
          messages.forEach(function (message) {
            if (typeof message === 'string') {
              this.$q.notify({
                icon: 'ion-alert',
                message: message,
                timeout: 7000,
                type: 'negative'
              })
            }
          }.bind(this))
        })
    }
  },
  mounted () {
    this.getUserInfo()
    this.countdownStart()
    if (!this.exchangeRequest || !this.exchangeRequest.exchangeFromAmount || !this.exchangeRequest.exchangeToAmount) {
      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>
