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
          <div class="container">
          <p class="text-bold text-secondary text-left" style="font-size: 140%;"><strong>Как можно подать заявку?</strong></p>
          <p>Заявку можно подать только, заполнив форму на сайте. Мы не принимаем заявки через e-mail, Telegram и другие мессенджеры.</p>
          <p>&nbsp;</p>
          <p class="text-bold text-secondary text-left" style="font-size: 140%;"><strong>Когда начинается обмен?</strong></p>
          <p>Заявка формируется после нажатия кнопки &laquo;Я оплатил&raquo;.Обмен начинается после поступления средств на наш счет.</p>
          <p>&nbsp;</p>
          <p class="text-bold text-secondary text-left" style="font-size: 140%;"><strong>Можно ли отменить обмен?</strong></p>
          <p>&nbsp;</p>
          <p>Обмен можно отменить, написав нам любым удобным для вас способом, указанным в контактах, если средства ещё не были отправлены на Ваш счет. Средства будут возвращены Вам за вычетом комиссии платёжной системы.</p>
          <p>&nbsp;</p>
          <p class="text-bold text-secondary text-left" style="font-size: 140%;"><strong>Почему заявка может быть отклонена?</strong></p>
          <p>Заявка может быть отклонена в случае указания неверных реквизитов, отсутствия оплаты, либо подтверждения оплаты.</p>
          <p>&nbsp;</p>
          <p class="text-bold text-secondary text-left" style="font-size: 140%;"><strong>Как узнать статус заявки?</strong></p>
          <p>Статус заявки можно узнать в Личном кабинете, либо в приходящих от нас при смене статуса заявки письмах на указанный Вами e-mail.</p>
          <p>&nbsp;</p>
          <p class="text-bold text-secondary text-left" style="font-size: 140%;"><strong>Что если я неправильно указал карту или кошелёк?</strong></p>
          <p>Если карта или кошелёк указаны некорректно, то платеж не отправится, и мы вернем Вам средства за вычетом комиссии. Если Вы указали чужую карту или кошелёк, то деньги вернуть будет нельзя.</p>
          <p>&nbsp;</p>
          <p class="text-bold text-secondary text-left" style="font-size: 140%;"><strong>Зачем регистрироваться на сайте?</strong></p>
          <p>Зарегистрированный пользователь получает ряд преимуществ таких как накопительная скидка, возможность сохранения кошельков, просмотр истории обменных операций.</p>
          <p>&nbsp;</p>
          <p class="text-bold text-secondary text-left" style="font-size: 140%;"><strong>Как верифицировать карту?</strong></p>
          <p>Для ряда переводов может потребоваться верификация Вашей банковской карты. Для этого необходимо отправить на нашу почту фотографию Вашей карты сделанной на фоне окна браузера с нашим сайтом.</p>
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
