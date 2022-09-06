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
          style="font-size: 105%;"
        >
          <p>Уважаемые владельцы мониторингов обменников, на нашем ресурсе действует одноуровневая реферальная программа с возможностью получения 30% от суммы комиссии с каждой сделки ваших рефералов. Подсчет накоплений осуществляется в USD с выводом в эквиваленте удобной для вас валютой.</p>
          <p>Для участия необходимо зарегистрироваться на нашем сайте и получить реферальную ссылку в соответствующем разделе личного кабинета.</p>
          <p>Ссылка на файл экспорта курсов <a href="https://webchange.org/api/v1/rates">https://webchange.org/api/v1/rates</a></p>
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
