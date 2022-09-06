<template>
  <q-page
    class="bg-tertiary"
    padding
    style="max-width: 1350px; margin: 0 auto;"
  >
    <div class="row justify-center">
      <div
        class="col-xs-12"
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
          <div class="container text-center">
            <p>Связаться с нами вы можете по следующим контактам:</p>
            <p>E-mail: webchange.org@gmail.com</p>
            <p>Telegram: @webchange_org</p>
            <p>Режим работы: круглосуточно</p>
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
    pageTitle () {
      return this.$store.getters['data/metaTitle']
    }
  }
}
</script>
