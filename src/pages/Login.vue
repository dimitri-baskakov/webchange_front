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
            @submit.prevent="login"
            action="#"
            class="container text-center"
          >
            <q-input
              :error="$v.form.email.$error"
              @blur="$v.form.email.$touch"
              autofocus
              color="white"
              class="text-bold q-my-lg"
              inverted-light
              stack-label="Email"
              type="email"
              v-model="form.email"
            ></q-input>
            <q-input
              :error="$v.form.password.$error"
              @blur="$v.form.password.$touch"
              color="white"
              class="text-bold q-my-lg"
              inverted-light
              stack-label="Пароль"
              type="password"
              v-model="form.password"
            ></q-input>
            <div
              class="q-body-1 q-my-lg text-left"
            >
              <router-link to="/password-recovery">Забыли пароль?</router-link>
            </div>
            <div
              class="q-my-lg text-center"
            >
              <vue-recaptcha
                :class="{ 'bg-negative shadow-2': $v.form.gRecaptchaResponse.$error }"
                :style="$v.form.gRecaptchaResponse.$error ? 'border: 1px solid red; border-radius: 15px;' : ''"
                @blur="$v.form.gRecaptchaResponse.$touch"
                @verify="gRecaptchaVerify"
                class="g-recaptcha"
                sitekey="6LflVF8UAAAAAMUnKl5TPIIPcTjzj9FK9jpJbBpy"
                size="normal"
                theme="light"
              >
              </vue-recaptcha>
            </div>
            <q-btn
              class="q-py-sm q-px-md uppercase"
              color="secondary"
              size="lg"
              type="submit"
            >
              <span class="q-subheading text-bold">
                Войти
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
    pageTitle () {
      return this.$store.getters['data/metaTitle']
    }
  },
  data: () => ({
    form: {
      email: '',
      gRecaptchaResponse: '',
      password: ''
    }
  }),
  methods: {
    gRecaptchaVerify (response) {
      this.form.gRecaptchaResponse = response
    },
    login () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('Не все поля заполнены верно.')
        return
      }
      this.$store.dispatch('auth/login', this.form)
        .then(response => {
          this.$q.notify({
            icon: 'ion-thumbs-up',
            message: response.data.message || 'Успешный вход в личный кабинет.',
            timeout: 5000,
            type: 'positive'
          })
          this.$router.push('/personal-area')
        }, error => {
          if (error.response && error.response.status >= 500) {
            this.$q.notify({
              icon: 'ion-alert',
              message: 'Ошибка сервера.',
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
  validations: {
    form: {
      email: {
        email,
        required
      },
      gRecaptchaResponse: {
        // required (val) {
        //   return val
        // }
      },
      password: {
        required
      }
    }
  }
}
</script>

<style>
</style>
