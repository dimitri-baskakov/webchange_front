<template>
  <q-page
    class="bg-tertiary"
    padding
    style="max-width: 1350px; margin: 0 auto;"
  >
    <div class="overflow-hidden q-pb-xl">
      <div
        :style="$q.screen.gt.sm ? 'font-size: 95%;' : 'font-size: 80%;'"
        class="row gutter-x-md gutter-y-xs justify-center self-center"
      >
        <!-- todo: удалить или переделать временное решение для обновления полей ввода
        после нескольких переходов на
        другие поля -->
        <div
          :class="{'hidden': true}"
          class="col-xs-6 column"
        >
          {{ exchangeFrom }}
        </div>
        <div
          :class="{'hidden': true}"
          class="col-xs-6 column"
        >
          {{ exchangeTo }}
        </div>
        <div
          class="col-xs-12 col-sm-11 col-md-6 column"
        >
          <div class="bg-secondary text-right text-white top-round-borders q-pa-md q-title">
            <q-icon
              name="mdi-arrow-up-bold-circle"
              size="27px"
            >
            </q-icon>
            <span class="text-bold">
              Отдаёте
            </span>
          </div>
            <!-- v-if="$q.screen.gt.sm || (!exchangeFrom.activeCurrency.show || (exchangeFrom.activeCurrency.key === key && exchangeFrom.activeCurrency.show))" -->
          <div
            :class="[ { 'bg-white': exchangeTo.activeCurrency.key != key }, exchangeTo.activeCurrency.key === key ? 'border-grey' : exchangeFrom.activeCurrency.key === key ? 'border-secondary' : 'border-white' ]"
            :key="key"
            @click="activateExchangeFrom(key)"
            class="row cursor-pointer items-center round-borders text-grey-9 text-left"
            style="margin-top: 4px; max-height: 40px;"
            v-for="(currency, key) in currencies"
          >
            <div class="col-1 text-center">
              <img
                :src="`statics/images/logos/${currency.img}`"
                size="27px"
                v-show="exchangeTo.activeCurrency.key != key"
              >
            </div>
            <div class="col-3 text-left q-pl-xs">
              {{ currency.name }}
            </div>
            <div
              :class="[ exchangeFrom.inputOffset != key ? 'offset-xs-1' : '', (exchangeFrom.amounts[key] < (rates.MIN && rates.MIN[key])) && exchangeFrom.amounts[key] ? 'text-red-13' : 'text-grey-5', exchangeFromError() && initExchangePressed && exchangeFrom.activeCurrency.key === key ? 'animate-blink' : '' ]"
              class="col-3 text-center"
              style="transition: all 700ms"
            >
              Min {{ rates.MIN && rates.MIN[key] }}
            </div>
            <div
              class="col"
            >
                <!-- @click.stop="" -->
                <!-- @change="inputExchangeFrom" -->
              <q-input
                :ref="`input_from_${key}`"
                :style="$q.screen.gt.sm ? 'font-size: 95%;' : 'font-size: 90%;'"
                @focus="exchangeFrom.inputOffset = key, activeDirection = 'from'"
                @input="inputExchangeFrom"
                align="left"
                class="round-input no-shadow q-px-md"
                color="grey-2"
                dark
                flat
                inverted-light
                min="0"
                numeric-keyboard-toggle
                placeholder=" Введите сумму"
                type="number"
                v-model="exchangeFrom.amounts[key]"
              ></q-input>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-11 col-md-6 column text-left">
          <div class="bg-primary text-left text-white top-round-borders q-pa-md q-title">
            <q-icon
              name="mdi-arrow-down-bold-circle q-mr-sm"
              size="27px"
            >
            </q-icon>
            <span class="text-bold">
              Получаете
            </span>
          </div>
            <!-- v-if="$q.screen.gt.sm || (!exchangeTo.activeCurrency.show || (exchangeTo.activeCurrency.key === key && exchangeTo.activeCurrency.show))" -->
          <div
            :class="[ { 'bg-white': exchangeFrom.activeCurrency.key != key }, exchangeFrom.activeCurrency.key === key ? 'border-grey' : exchangeTo.activeCurrency.key === key ? 'border-primary' : 'border-white' ]"
            :key="key"
            @click="activateExchangeTo(key)"
            class="row reverse cursor-pointer items-center round-borders text-grey-9 text-left"
            style="margin-top: 4px; max-height: 40px;"
            v-for="(currency, key) in currencies"
          >
            <div class="col-1 text-center">
              <img
                :src="`statics/images/logos/${currency.img}`"
                size="27px"
                v-show="exchangeFrom.activeCurrency.key != key"
              >
            </div>
            <div class="col-3 text-right q-pr-xs">
              {{ currency.name }}
            </div>
            <div
              :class="[ exchangeTo.inputOffset != key ? 'offset-xs-1' : '', (exchangeTo.amounts[key] > (rates.RESERVES && rates.RESERVES[key])) && exchangeTo.amounts[key] ? 'text-red-13' : 'text-grey-5', exchangeToError() && initExchangePressed && exchangeTo.activeCurrency.key === key ? 'animate-blink' : '' ]"
              class="col-3 text-center"
              style="transition: all 700ms"
            >
              Резерв {{ rates.RESERVES && rates.RESERVES[key] }}
            </div>
            <div class="col">
                <!-- @click.stop="" -->
              <q-input
                :ref="`input_to_${key}`"
                :style="$q.screen.gt.sm ? 'font-size: 95%;' : 'font-size: 90%;'"
                @focus="exchangeTo.inputOffset = key, activeDirection = 'to'"
                @input="inputExchangeTo()"
                align="left"
                class="no-shadow round-input q-px-md"
                color="grey-2"
                dark
                flat
                inverted-light
                min="0"
                numeric-keyboard-toggle
                placeholder=" Введите сумму"
                type="number"
                v-model="exchangeTo.amounts[key]"
              ></q-input>
            </div>
          </div>
        </div>
        <div class="col-xs-12 q-mt-lg">
          <div class="row justify-center items-center text-center">
            <div
              class="col-xs-12 col-sm-11 col-md-4 bg-white border-secondary-thin items-center round-borders q-pa-sm q-my-xs"
            >
              <div
                class="row justify-center items-center"
              >
                <div class="col-1">
                  <img
                    :src="`statics/images/logos/${exchangeFrom.activeCurrency.key ? currencies[exchangeFrom.activeCurrency.key].img : ''}`"
                    size="27px"
                    v-show="exchangeFrom.activeCurrency.key"
                  >
                </div>
                <div class="col">
                  <q-input
                    :style="$q.screen.gt.sm ? 'font-size: 95%;' : 'font-size: 90%;'"
                    @input="inputExchangeFrom"
                    align="left"
                    class="no-shadow q-px-md"
                    color="white"
                    dark
                    flat
                    inverted-light
                    min="0"
                    numeric-keyboard-toggle
                    placeholder=" Отдаёте"
                    type="number"
                    v-model="exchangeFrom.amounts[exchangeFrom.activeCurrency.key]"
                  ></q-input>
                </div>
                <div
                  :class="[ exchangeFromError() ? 'text-red-13' : 'text-grey-5', exchangeFromError() && initExchangePressed ? 'animate-blink' : '' ]"
                  class="col-4 text-center"
                  style="transition: all 700ms"
                  v-show="exchangeFrom.activeCurrency.key"
                >
                  Min {{ rates.MIN && rates.MIN[exchangeFrom.activeCurrency.key || ''] }}
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-11 col-md-4">
              <q-btn
                @click="initExchange()"
                class="q-py-sm q-px-xl uppercase"
                size="lg"
                color="secondary"
              >
                <span class="q-subheading text-bold">
                  Обменять
                </span>
              </q-btn>
            </div>
            <div
              class="col-xs-12 col-sm-11 col-md-4 bg-white border-primary-thin items-center round-borders q-pa-sm q-my-xs"
            >
              <div
                class="row justify-center items-center"
              >
                <div class="col-1">
                  <img
                    :src="`statics/images/logos/${exchangeTo.activeCurrency.key ? currencies[exchangeTo.activeCurrency.key].img : ''}`"
                    size="27px"
                    v-show="exchangeTo.activeCurrency.key"
                  >
                </div>
                <div class="col">
                  <q-input
                    :style="$q.screen.gt.sm ? 'font-size: 95%;' : 'font-size: 90%;'"
                    @input="inputExchangeTo()"
                    align="left"
                    class="no-shadow q-px-md"
                    color="white"
                    dark
                    flat
                    inverted-light
                    min="0"
                    numeric-keyboard-toggle
                    placeholder=" Получаете"
                    type="number"
                    v-model="exchangeTo.amounts[exchangeTo.activeCurrency.key]"
                  ></q-input>
                </div>
                <div
                  :class="[ exchangeToError() ? 'text-red-13' : 'text-grey-5', exchangeToError() && initExchangePressed ? 'animate-blink' : '' ]"
                  class="col-4 text-center"
                  style="transition: all 700ms"
                  v-show="exchangeTo.activeCurrency.key"
                >
                  Резерв {{ rates.RESERVES && rates.RESERVES[exchangeTo.activeCurrency.key || ''] }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  computed: {
    currencies: function () {
      return this.$store.getters['data/currenciesWithRates']
    },
    exchangeRequest: function () {
      return this.$store.getters['data/exchangeRequest'] || {}
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
    activeDirection: '',
    exchangeFrom: {
      activeCurrency: {
        amount: 0,
        key: '',
        show: false
      },
      amounts: {},
      inputOffset: ''
    },
    exchangeTo: {
      activeCurrency: {
        amount: 0,
        key: '',
        show: false
      },
      amounts: {},
      inputOffset: ''
    },
    firstExchange: true,
    initExchangePressed: false
    // rates: {}
  }),
  methods: {
    activateExchangeFrom (key) {
      if (this.exchangeTo.activeCurrency.key === key) {
        this.exchangeTo.activeCurrency.key = ''
      }
      this.exchangeFrom.activeCurrency.key = key
      this.exchangeFrom.inputOffset = key
      this.activeDirection = 'from'
      this.exchangeFrom.activeCurrency.amount = this.exchangeFrom.amounts[key]
      if (this.$refs['input_from_' + key]) {
        this.$refs['input_from_' + key][0].focus()
      }
      // this.exchangeFrom.activeCurrency.show = !this.exchangeFrom.activeCurrency.show
    },
    activateExchangeTo (key) {
      if (this.exchangeFrom.activeCurrency.key === key) {
        this.exchangeFrom.activeCurrency.key = ''
      }
      this.exchangeTo.activeCurrency.key = key
      this.exchangeTo.inputOffset = key
      this.activeDirection = 'to'
      this.exchangeTo.activeCurrency.amount = this.exchangeTo.amounts[key]
      if (this.firstExchange && this.$refs['input_from_' + this.exchangeFrom.inputOffset] && !this.exchangeFrom.activeCurrency.amount) {
        this.$refs['input_from_' + this.exchangeFrom.inputOffset][0].focus()
        this.firstExchange = false
      } else {
        if (this.$refs['input_to_' + key]) {
          this.$refs['input_to_' + key][0].focus()
        }
      }
      // this.exchangeTo.activeCurrency.show = !this.exchangeTo.activeCurrency.show
    },
    exchangeFromError () {
      return this.exchangeFrom.amounts[this.exchangeFrom.activeCurrency.key || ''] && (this.exchangeFrom.amounts[this.exchangeFrom.activeCurrency.key || ''] < (this.rates.MIN && this.rates.MIN[this.exchangeFrom.activeCurrency.key || '']))
    },
    exchangeToError () {
      return this.exchangeTo.amounts[this.exchangeTo.activeCurrency.key || ''] && (this.exchangeTo.amounts[this.exchangeTo.activeCurrency.key || ''] > (this.rates.RESERVES && this.rates.RESERVES[this.exchangeTo.activeCurrency.key || '']))
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
    initExchange () {
      this.initExchangePressed = true
      let message = ''
      if (!this.exchangeFrom.activeCurrency.amount || !this.exchangeTo.activeCurrency.amount) {
        message = 'необходимо ввести сумму, которую хотите обменять или получить'
      }
      if (this.exchangeTo.activeCurrency.key === '') {
        message = 'не указана валюта, которую получаете'
      }
      if (this.exchangeFrom.activeCurrency.key === '') {
        message = 'не указана валюта, которую отдаете'
      }
      if (message) {
        this.$q.notify({
          icon: 'ion-warning',
          message: message,
          timeout: 5000
        })
        return
      }
      if (this.exchangeFromError() || this.exchangeToError()) {
        return
      }
      this.$store.dispatch('data/updateExchangeRequest', {
        exchangeFrom: this.exchangeFrom,
        exchangeTo: this.exchangeTo
      })
        .then(response => {
          // if (response.data.success) {
          this.$router.push('/filling-in-requisites')
          // }
        })
        .catch(error => {
          console.log(error)
          this.$q.notify({
            icon: 'ion-warning',
            message: 'Не удалось начать обмен.',
            timeout: 5000
          })
        })
    },
    inputExchangeFrom (newVal) {
      // console.log(newVal)
      // -?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?
      // let amount = newVal.replace(new RegExp(/[^0-9.,]/g, 'g'), '')
      // console.log(amount)
      this.initExchangePressed = false
      // if (
      //   // this.exchangeFrom.activeCurrency &&
      //   // this.exchangeFrom.amounts &&
      //   // val.amounts &&
      //   // this.activeDirection === 'from' &&
      //   this.exchangeFrom.activeCurrency.key
      // ) {
      for (let currencyKey of Object.keys(this.currencies)) {
        if (currencyKey !== this.exchangeFrom.activeCurrency.key) {
          this.exchangeFrom.amounts[currencyKey] = ''
        }
        // this.exchangeTo.amounts[currencyKey] = (this.rates.PRICES[this.exchangeFrom.activeCurrency.key][currencyKey] || 0) * (amount || 0)
        this.exchangeTo.amounts[currencyKey] = (this.rates.PRICES[this.exchangeFrom.activeCurrency.key][currencyKey] || 0) * (this.exchangeFrom.amounts[this.exchangeFrom.activeCurrency.key] || 0)
        let precision = this.rates.PRICES[this.exchangeFrom.activeCurrency.key][currencyKey]
          ? this.rates.PRICES[this.exchangeFrom.activeCurrency.key][currencyKey].toString().split('.').pop().length
          : 0
        this.exchangeTo.amounts[currencyKey] = this.exchangeTo.amounts[currencyKey].toFixed(precision) > 0
          ? this.exchangeTo.amounts[currencyKey].toFixed(precision)
          : 0
      }
      this.exchangeFrom.activeCurrency.amount = this.exchangeFrom.amounts[this.exchangeFrom.activeCurrency.key]
      this.exchangeTo.activeCurrency.amount = this.exchangeTo.amounts[this.exchangeTo.activeCurrency.key]
      // }
    },
    inputExchangeTo () {
      this.initExchangePressed = false
      // if (
      //   // this.exchangeTo.activeCurrency &&
      //   // this.exchangeTo.amounts &&
      //   // this.activeDirection === 'to' &&
      //   this.exchangeTo.activeCurrency.key
      // ) {
      for (let currencyKey of Object.keys(this.currencies)) {
        if (currencyKey !== this.exchangeTo.activeCurrency.key) {
          this.exchangeTo.amounts[currencyKey] = ''
        }
        this.exchangeFrom.amounts[currencyKey] = (this.rates.PRICES[this.exchangeTo.activeCurrency.key][currencyKey] || 0) * (this.exchangeTo.amounts[this.exchangeTo.activeCurrency.key] || 0)
        let precision = this.rates.PRICES[this.exchangeTo.activeCurrency.key][currencyKey]
          ? this.rates.PRICES[this.exchangeTo.activeCurrency.key][currencyKey].toString().split('.').pop().length
          : 0
        this.exchangeFrom.amounts[currencyKey] = this.exchangeFrom.amounts[currencyKey].toFixed(precision) > 0
          ? this.exchangeFrom.amounts[currencyKey].toFixed(precision)
          : 0
      }
      this.exchangeFrom.activeCurrency.amount = this.exchangeFrom.amounts[this.exchangeFrom.activeCurrency.key]
      this.exchangeTo.activeCurrency.amount = this.exchangeTo.amounts[this.exchangeTo.activeCurrency.key]
      // }
    }
  },
  mounted () {
    this.exchangeFrom.activeCurrency.key = this.exchangeRequest.exchangeFromKey || ''
    this.exchangeFrom.activeCurrency.amount = this.exchangeFrom.amounts[this.exchangeRequest.exchangeFromKey] = this.exchangeRequest.exchangeFromAmount || 0
    this.exchangeTo.activeCurrency.key = this.exchangeRequest.exchangeToKey || ''
    this.exchangeTo.activeCurrency.amount = this.exchangeTo.amounts[this.exchangeRequest.exchangeToKey] = this.exchangeRequest.exchangeToAmount || 0
  }
}
</script>
