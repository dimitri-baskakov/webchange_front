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
        <!-- {{ userWallets }} -->
        <!-- {{ exchangeTo.activeCurrency.key }} -->
        <div
          class="text-grey-8"
        >
          <form
            @submit.prevent="sendRequest"
            action="#"
            class="container text-center"
          >
            <q-input
              :error="$v.exchangeFrom.activeCurrency.amount.$error"
              :placeholder="' ' + (rates.MIN && rates.MIN[exchangeFrom.activeCurrency.key])"
              @blur="$v.exchangeFrom.activeCurrency.amount.$touch"
              @input="inputExchangeFrom()"
              autofocus
              class="text-bold q-my-lg"
              color="white"
              inverted-light
              :stack-label="labelExchangeFrom"
              type="number"
              v-model="exchangeFrom.activeCurrency.amount"
            >
              <div class="text-right q-pt-md q-pr-md">
                <img
                  :src="`statics/images/logos/${currencies[exchangeFrom.activeCurrency.key].img}`"
                  size="27px"
                >
              </div>
            </q-input>
              <!-- :placeholder="' ' + (rates.RESERVES && rates.RESERVES[exchangeTo.activeCurrency.key])" -->
            <q-input
              :error="$v.exchangeTo.activeCurrency.amount.$error"
              @blur="$v.exchangeTo.activeCurrency.amount.$touch"
              @input="inputExchangeTo()"
              class="text-bold q-my-lg"
              color="white"
              inverted-light
              :stack-label="labelExchangeTo"
              type="number"
              v-model="exchangeTo.activeCurrency.amount"
            >
              <div class="text-right q-pt-md q-pr-md">
                <img
                  :src="`statics/images/logos/${currencies[exchangeTo.activeCurrency.key].img}`"
                  size="27px"
                >
              </div>
            </q-input>
              <!-- @input="$refs['user_wallet_select'].clear()" -->
              <!-- v-if="currenciesCards.indexOf(exchangeFrom.activeCurrency.key) === -1" -->
            <q-input
              :error="$v.exchangeFrom.senderWallet.$error"
              :placeholder="' ' + currencies[exchangeFrom.activeCurrency.key].example"
              :stack-label="exchangeFrom.activeCurrency.key !== 'QIWI' ? `Укажите адрес кошелька ${exchangeFrom.activeCurrency.key} отправителя` : 'Укажите номер QIWI кошелька отправителя'"
              @blur="$v.exchangeFrom.senderWallet.$touch"
              class="text-bold q-mt-lg"
              color="white"
              inverted-light
              type="text"
              v-if="exchangeFrom.activeCurrency.key === 'QIWI'"
              v-model="exchangeFrom.senderWallet"
            ></q-input>
            <q-input
              :error="$v.exchangeFrom.senderWallet.$error"
              :placeholder="' ' + currencies['VSMC'].example"
              @blur="$v.exchangeFrom.senderWallet.$touch"
              class="text-bold q-my-lg"
              color="white"
              inverted-light
              stack-label="Укажите номер карты отправителя"
              type="text"
              v-if="currenciesCards.indexOf(exchangeFrom.activeCurrency.key) !== -1 && exchangeFrom.activeCurrency.key !== 'QIWI'"
              v-model="exchangeFrom.senderWallet"
            ></q-input>
            <q-input
              :error="$v.exchangeTo.recipientWallet.$error"
              :placeholder="' ' + currencies['VSMC'].example"
              @blur="$v.exchangeTo.recipientWallet.$touch"
              class="text-bold q-my-lg"
              color="white"
              inverted-light
              stack-label="Укажите номер карты получателя"
              type="text"
              v-if="currenciesCards.indexOf(exchangeTo.activeCurrency.key) !== -1 && exchangeTo.activeCurrency.key !== 'QIWI'"
              v-model="exchangeTo.recipientWallet"
            ></q-input>
            <q-input
              :error="$v.exchangeFrom.senderName.$error"
              :placeholder="' ' + currencies['VSMC'].exampleRecipientName"
              @blur="$v.exchangeFrom.senderName.$touch"
              class="text-bold q-my-lg"
              color="white"
              inverted-light
              stack-label="Укажите ФИО отправителя"
              type="text"
              v-if="currenciesCards.indexOf(exchangeFrom.activeCurrency.key) !== -1 && exchangeFrom.activeCurrency.key !== 'QIWI'"
              v-model="exchangeFrom.senderName"
            ></q-input>
            <q-input
              :error="$v.exchangeTo.recipientName.$error"
              :placeholder="' ' + currencies['VSMC'].exampleRecipientName"
              @blur="$v.exchangeTo.recipientName.$touch"
              class="text-bold q-my-lg"
              color="white"
              inverted-light
              stack-label="Укажите ФИО получателя"
              type="text"
              v-if="currenciesCards.indexOf(exchangeTo.activeCurrency.key) !== -1 && exchangeTo.activeCurrency.key !== 'QIWI'"
              v-model="exchangeTo.recipientName"
            ></q-input>
            <q-input
              :error="$v.exchangeFrom.bankName.$error"
              :placeholder="' ' + currencies['VSMC'].exampleBankName"
              @blur="$v.exchangeFrom.bankName.$touch"
              class="text-bold q-my-lg"
              color="white"
              inverted-light
              stack-label="Укажите название банка"
              type="text"
              v-if="exchangeFrom.activeCurrency.key === 'VSMC'"
              v-model="exchangeFrom.bankName"
            ></q-input>
            <q-input
              :error="$v.exchangeTo.bankName.$error"
              :placeholder="' ' + currencies['VSMC'].exampleBankName"
              @blur="$v.exchangeTo.bankName.$touch"
              class="text-bold q-my-lg"
              color="white"
              inverted-light
              stack-label="Укажите название банка"
              type="text"
              v-if="exchangeTo.activeCurrency.key === 'VSMC'"
              v-model="exchangeTo.bankName"
            ></q-input>
            <!-- <q-input
              :error="$v.exchangeTo.recipientWallet.$error"
              :placeholder="' ' + currencies['QIWI'].example"
              @blur="$v.exchangeTo.recipientWallet.$touch"
              class="text-bold q-mt-lg"
              color="white"
              inverted-light
              stack-label="Укажите номер QIWI кошелька получателя"
              type="number"
              v-if="exchangeRequest.exchangeToKey === 'QIWI'"
              v-model="exchangeTo.recipientWallet"
            ></q-input> -->
            <!-- <q-input
              :placeholder="' ' + currencies['QIWI'].example"
              class="text-bold q-mt-lg"
              color="white"
              inverted-light
              stack-label="Укажите номер QIWI плательщика"
              type="number"
              v-if="exchangeRequest.exchangeFromKey === 'QIWI'"
              v-model="exchangeFrom.senderWallet"
            ></q-input> -->
            <q-input
              :error="$v.exchangeTo.recipientWallet.$error"
              :placeholder="' ' + currencies[exchangeTo.activeCurrency.key].example"
              :stack-label="exchangeTo.activeCurrency.key !== 'QIWI' ? `Укажите адрес Вашего ${exchangeTo.activeCurrency.key} кошелька` : 'Укажите номер QIWI кошелька получателя'"
              @blur="$v.exchangeTo.recipientWallet.$touch"
              @input="$refs['user_wallet_select'].clear()"
              class="text-bold q-mt-lg"
              color="white"
              inverted-light
              type="text"
              v-if="currenciesCards.indexOf(exchangeTo.activeCurrency.key) === -1"
              v-model="exchangeTo.recipientWallet"
            ></q-input>
              <!-- v-if="loggedIn && currenciesCards.indexOf(exchangeTo.activeCurrency.key) === -1 && exchangeTo.activeCurrency.key !== 'QIWI'" -->
            <div
              class="q-body-1 text-left"
              v-if="loggedIn && currenciesCards.indexOf(exchangeTo.activeCurrency.key) === -1"
            >
              <q-checkbox
                :disable="!!userWalletSelect.walletSelected"
                checked-icon="ion-checkbox-outline"
                color="secondary"
                unchecked-icon="ion-square-outline"
                v-model="saveWalletChecked"
              >
                &nbsp; Сохранить кошелек
              </q-checkbox>
            </div>
              <!-- :options="userWalletSelect.walletSelectOptions" -->
              <!-- v-if="loggedIn && currenciesCards.indexOf(exchangeTo.activeCurrency.key) === -1 && exchangeTo.activeCurrency.key !== 'QIWI'" -->
            <q-select
              :options="userWalletSelectOptions"
              :stack-label="userWalletSelect.walletSelectLabel"
              @input="userWalletSelected"
              class="text-black q-my-lg"
              clearable
              color="white"
              inverted
              radio
              ref="user_wallet_select"
              v-if="loggedIn && currenciesCards.indexOf(exchangeTo.activeCurrency.key) === -1"
              v-model="userWalletSelect.walletSelected"
            ></q-select>
            <q-input
              :disabled="exchangeTo.withoutDestinationTag"
              :placeholder="' ' + currencies['XRP'].exampleDestinationTag"
              :readonly="exchangeTo.withoutDestinationTag"
              class="text-bold q-mt-lg"
              color="white"
              inverted-light
              stack-label="Укажите Destination tag"
              type="text"
              v-if="exchangeTo.activeCurrency.key === 'XRP'"
              v-model="exchangeTo.destinationTag"
            ></q-input>
            <div
              class="q-body-1 text-left"
              v-if="exchangeTo.activeCurrency.key === 'XRP'"
            >
              <q-checkbox
                checked-icon="ion-checkbox-outline"
                color="secondary"
                unchecked-icon="ion-square-outline"
                v-model="exchangeTo.withoutDestinationTag"
              >
                &nbsp; Без Destination tag
              </q-checkbox>
            </div>
            <q-input
              :disabled="exchangeTo.withoutPaymentId"
              :placeholder="' ' + currencies['XMR'].examplePaymentId"
              :readonly="exchangeTo.withoutPaymentId"
              class="text-bold q-mt-lg"
              color="white"
              inverted-light
              stack-label="Укажите Payment ID"
              type="text"
              v-if="exchangeTo.activeCurrency.key === 'XMR'"
              v-model="exchangeTo.paymentId"
            ></q-input>
            <div
              class="q-body-1 text-left"
              v-if="exchangeTo.activeCurrency.key === 'XMR'"
            >
              <q-checkbox
                checked-icon="ion-checkbox-outline"
                color="secondary"
                unchecked-icon="ion-square-outline"
                v-model="exchangeTo.withoutPaymentId"
              >
                &nbsp; Без Payment ID
              </q-checkbox>
            </div>
            <q-input
              :disabled="exchangeTo.withoutMessage"
              :placeholder="' ' + currencies['XEM'].exampleMessage"
              :readonly="exchangeTo.withoutMessage"
              class="text-bold q-mt-lg"
              color="white"
              inverted-light
              stack-label="Укажите Message"
              type="text"
              v-if="exchangeTo.activeCurrency.key === 'XEM'"
              v-model="exchangeTo.message"
            ></q-input>
            <div
              class="q-body-1 text-left"
              v-if="exchangeTo.activeCurrency.key === 'XEM'"
            >
              <q-checkbox
                checked-icon="ion-checkbox-outline"
                color="secondary"
                unchecked-icon="ion-square-outline"
                v-model="exchangeTo.withoutMessage"
              >
                &nbsp; Без Message
              </q-checkbox>
            </div>
              <!-- v-if="currenciesCards.indexOf(exchangeTo.activeCurrency.key) === -1 && exchangeTo.activeCurrency.key !== 'QIWI'" -->
            <q-input
              :error="$v.exchangeTo.recipientEmail.$error"
              :placeholder="' ' + currencies['BTC'].exampleEmail"
              @blur="$v.exchangeTo.recipientEmail.$touch"
              class="text-bold q-my-lg"
              color="white"
              inverted-light
              stack-label="Укажите Ваш email"
              type="email"
              v-model="exchangeTo.recipientEmail"
            ></q-input>
            <div
              class="q-my-lg text-center"
            >
              <vue-recaptcha
                :class="{ 'bg-negative shadow-2': $v.exchangeTo.gRecaptchaResponse.$error }"
                :style="$v.exchangeTo.gRecaptchaResponse.$error ? 'border: 1px solid red; border-radius: 15px;' : ''"
                @blur="$v.exchangeTo.gRecaptchaResponse.$touch"
                @verify="gRecaptchaVerify"
                class="g-recaptcha"
                sitekey="6LflVF8UAAAAAMUnKl5TPIIPcTjzj9FK9jpJbBpy"
                size="normal"
                theme="light"
              >
              </vue-recaptcha>
            </div>
            <div
              class="q-body-1 q-my-lg"
            >
              <q-checkbox
                :class="{ 'text-negative': $v.exchangeTo.agreementChecked.$error }"
                :color="$v.exchangeTo.agreementChecked.$error ? 'negative' : 'secondary'"
                :error="$v.exchangeTo.agreementChecked.$error"
                @blur="$v.exchangeTo.agreementChecked.$touch"
                checked-icon="ion-checkbox-outline"
                unchecked-icon="ion-square-outline"
                v-model="exchangeTo.agreementChecked"
              >
                &nbsp; Я согласен с &nbsp;
              </q-checkbox>
              <router-link to="/agreement">условиями и правилами сервиса</router-link>
            </div>
            <q-btn
              class="q-mt-sm q-py-sm q-px-md uppercase"
              color="secondary"
              size="lg"
              type="submit"
            >
              <span class="q-subheading text-bold">
                Отправить заявку
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
import {
  email,
  required
} from 'vuelidate/lib/validators'
import VueRecaptcha from 'vue-recaptcha'

export default {
  components: {
    VueRecaptcha
  },
  computed: {
    currencies: function () {
      return this.$store.getters['data/currenciesWithRates']
    },
    currenciesCards: function () {
      return this.$store.getters['data/currenciesCards']
    },
    exchangeRequest: function () {
      return this.$store.getters['data/exchangeRequest'] || {}
    },
    form () {
      return {
        exchangeFrom: this.exchangeFrom,
        exchangeTo: this.exchangeTo
      }
    },
    labelExchangeFrom () {
      return this.exchangeFrom.activeCurrency.amount < (this.rates.MIN && this.rates.MIN[this.exchangeFrom.activeCurrency.key]) ? `Отдаёте <span class="animate-blink">Min ${this.rates.MIN[this.exchangeFrom.activeCurrency.key]}</span>` : 'Отдаёте'
    },
    labelExchangeTo () {
      return this.exchangeTo.activeCurrency.amount > (this.rates.RESERVES && this.rates.RESERVES[this.exchangeTo.activeCurrency.key]) ? `Получаете <span class="animate-blink">Резерв ${this.rates.RESERVES[this.exchangeTo.activeCurrency.key]}</span>` : 'Получаете'
    },
    loggedIn: function () {
      return this.$store.getters['auth/loggedIn']
    },
    pageTitle () {
      return this.$store.getters['data/metaTitle']
    },
    rates () {
      return this.$store.getters['data/rates']
    },
    userWalletSelectOptions () {
      var tempCurrenciesArray = Object.values(this.$store.getters['data/userWallets']).map(userWallet => {
        return {
          label: userWallet.currency + ' ' + userWallet.walletId,
          value: userWallet.id
          // value: userWallet.key.toUpperCase()
        }
      })
      return tempCurrenciesArray
      // console.log(this.$store.getters['data/userWallets'])
      // return this.$store.getters['data/userWallets'] || []
    },
    userWallets () {
      return this.$store.getters['data/userWallets']
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

    this.exchangeFrom.activeCurrency.key =
    (this.$route.query.from && this.$route.query.from.toUpperCase()) ||
    this.exchangeRequest.exchangeFromKey ||
    'BTC'

    this.exchangeFrom.activeCurrency.amount =
    this.exchangeRequest.exchangeFromAmount ||
    ''

    this.exchangeTo.activeCurrency.key =
    (this.$route.query.to && this.$route.query.to.toUpperCase()) ||
    this.exchangeRequest.exchangeToKey ||
    'BTC'

    this.exchangeTo.activeCurrency.amount =
    this.exchangeRequest.exchangeToAmount ||
    ''
    // сделать автоподстановку почты пользователя
    this.exchangeTo.recipientEmail = this.loggedIn ? '' : ''
  },
  data: () => ({
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
    },
    // rates: {},
    saveWalletChecked: false,
    userWalletSelect: {
      walletSelectLabel: 'Сохраненные кошельки',
      walletSelected: ''
    }
  }),
  methods: {
    cancelRequest () {
      this.$v.exchangeFrom.activeCurrency.amount.$touch()
      this.$v.exchangeTo.activeCurrency.amount.$touch()
      if (!this.$v.exchangeFrom.activeCurrency.amount.$error && !this.$v.exchangeTo.activeCurrency.amount.$error) {
        this.$store.dispatch('data/updateExchangeRequest', {
          exchangeFrom: this.exchangeFrom,
          exchangeTo: this.exchangeTo
        })
          .then(response => {
            this.$router.push('/')
          })
      } else {
        this.$router.push('/')
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
    gRecaptchaVerify (response) {
      this.exchangeTo.gRecaptchaResponse = response
    },
    inputExchangeFrom () {
      this.exchangeTo.activeCurrency.amount = (this.rates.PRICES[this.exchangeFrom.activeCurrency.key][this.exchangeTo.activeCurrency.key] || 0) * (this.exchangeFrom.activeCurrency.amount || 0)
      let precision = this.rates.PRICES[this.exchangeFrom.activeCurrency.key][this.exchangeTo.activeCurrency.key]
        ? this.rates.PRICES[this.exchangeFrom.activeCurrency.key][this.exchangeTo.activeCurrency.key].toString().split('.').pop().length
        : 0
      this.exchangeTo.activeCurrency.amount = this.exchangeTo.activeCurrency.amount.toFixed(precision) > 0
        ? this.exchangeTo.activeCurrency.amount.toFixed(precision)
        : 0
      precision = this.rates.PRICES[this.exchangeTo.activeCurrency.key][this.exchangeFrom.activeCurrency.key]
        ? this.rates.PRICES[this.exchangeTo.activeCurrency.key][this.exchangeFrom.activeCurrency.key].toString().split('.').pop().length
        : 0
      this.exchangeFrom.activeCurrency.amount = this.exchangeFrom.activeCurrency.amount.toFixed(precision) > 0
        ? this.exchangeFrom.activeCurrency.amount.toFixed(precision)
        : 0
    },
    inputExchangeTo () {
      this.exchangeFrom.activeCurrency.amount = (this.rates.PRICES[this.exchangeTo.activeCurrency.key][this.exchangeFrom.activeCurrency.key] || 0) * (this.exchangeTo.activeCurrency.amount || 0)
      let precision = this.rates.PRICES[this.exchangeTo.activeCurrency.key][this.exchangeFrom.activeCurrency.key]
        ? this.rates.PRICES[this.exchangeTo.activeCurrency.key][this.exchangeFrom.activeCurrency.key].toString().split('.').pop().length
        : 0
      this.exchangeFrom.activeCurrency.amount = this.exchangeFrom.activeCurrency.amount.toFixed(precision) > 0
        ? this.exchangeFrom.activeCurrency.amount.toFixed(precision)
        : 0
      precision = this.rates.PRICES[this.exchangeFrom.activeCurrency.key][this.exchangeTo.activeCurrency.key]
        ? this.rates.PRICES[this.exchangeFrom.activeCurrency.key][this.exchangeTo.activeCurrency.key].toString().split('.').pop().length
        : 0
      this.exchangeTo.activeCurrency.amount = this.exchangeTo.activeCurrency.amount.toFixed(precision) > 0
        ? this.exchangeTo.activeCurrency.amount.toFixed(precision)
        : 0
    },
    sendRequest () {
      this.$v.exchangeTo.$touch()
      if (this.$v.exchangeTo.$error) {
        this.$q.notify('Не все поля заполнены верно.')
        return
      }
      // проверка на заполнение доп полей
      if (
        (!this.exchangeTo.destinationTag && this.exchangeTo.withoutDestinationTag && this.exchangeTo.activeCurrency.key === 'XRP') ||
        (!this.exchangeTo.message && this.exchangeTo.withoutMessage && this.exchangeTo.activeCurrency.key === 'XEM') ||
        (!this.exchangeTo.paymentId && this.exchangeTo.withoutPaymentId && this.exchangeTo.activeCurrency.key === 'XMR')
      ) {
        this.$q.dialog({
          title: 'Уведомление',
          message: 'Вы собираетесь отправить заявку без ' +
          (this.exchangeTo.activeCurrency.key === 'XRP'
            ? 'Destination tag' : (this.exchangeTo.activeCurrency.key === 'XMR'
              ? 'Payment ID' : (this.exchangeTo.activeCurrency.key === 'XEM'
                ? 'Message' : ''))),
          ok: 'ОК',
          cancel: 'Не отправлять'
        }).then(() => {
          this.$store.dispatch('data/exchangeRequest', this.form)
            .then(response => {
              this.$router.push('/payment')
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
        }).catch(() => {
          this.$q.notify({
            icon: 'ion-alert',
            message: 'Отмена отправки...',
            timeout: 5000,
            type: 'negative'
          })
        })
      } else {
        this.$store.dispatch('data/exchangeRequest', this.form)
          .then(response => {
            this.$router.push('/payment')
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
    userWalletSelected (newVal) {
      if (newVal) {
        let selectedWallet = this.userWallets.find(userWallet => {
          return userWallet.id === newVal
        })
        this.exchangeTo.recipientWallet = selectedWallet && selectedWallet.walletId
        this.saveWalletChecked = false
      }
    }
  },
  mounted () {
    this.getUserInfo()
  },
  validations: {
    exchangeFrom: {
      activeCurrency: {
        amount: {
          required (val) {
            return val >= (this.rates.MIN && this.rates.MIN[this.exchangeFrom.activeCurrency.key])
          }
        }
      },
      bankName: {
        required (val) {
          return this.exchangeFrom.activeCurrency.key !== 'VSMC' || required(val)
        }
      },
      senderName: {
        required (val) {
          return this.currenciesCards.indexOf(this.exchangeFrom.activeCurrency.key) === -1 || required(val)
        }
      },
      senderWallet: {
        required (val) {
          return !(this.exchangeFrom.activeCurrency.key === 'QIWI' || (this.currenciesCards.indexOf(this.exchangeFrom.activeCurrency.key) !== -1 && this.exchangeFrom.activeCurrency.key !== 'QIWI')) || required(val)
        }
      }
    },
    exchangeTo: {
      activeCurrency: {
        amount: {
          required (val) {
            // return false
            return val <= (this.rates.RESERVES && this.rates.RESERVES[this.exchangeTo.activeCurrency.key])
          }
        }
      },
      agreementChecked: {
        required (val) {
          return val
        }
      },
      bankName: {
        required (val) {
          return this.exchangeTo.activeCurrency.key !== 'VSMC' || required(val)
        }
      },
      gRecaptchaResponse: {
        // required (val) {
        //   return val
        // }
      },
      recipientEmail: {
        email,
        required
      },
      recipientName: {
        required (val) {
          return !(this.currenciesCards.indexOf(this.exchangeTo.activeCurrency.key) !== -1 && this.exchangeTo.activeCurrency.key !== 'QIWI') || required(val)
        }
      },
      recipientWallet: {
        required (val) {
          return !((this.currenciesCards.indexOf(this.exchangeTo.activeCurrency.key) !== -1 && this.exchangeTo.activeCurrency.key !== 'QIWI') || this.currenciesCards.indexOf(this.exchangeTo.activeCurrency.key) === -1) || required(val)
        }
      }
    }
  }
}
</script>

<style>
</style>
