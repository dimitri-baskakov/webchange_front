<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="statics/images/Man-Counting-Money-279x320.png"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">Такой страницы нет...<strong>(404)</strong></p>
    <q-btn
      @click="$router.go('-1')"
      class="uppercase"
      color="secondary"
      style="width:200px;"
    >Назад</q-btn>
    <br>
    <br>
    <q-btn
      @click="$router.push('/')"
      class="uppercase"
      color="secondary"
      style="width:200px;"
    >На главную</q-btn>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
