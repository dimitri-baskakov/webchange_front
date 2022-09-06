<template>
  <div id="q-app">
    <router-view>
    </router-view>
  </div>
</template>

<script>
export default {
  data: () => ({
    // title: 'Webchange.org'
  }),
  meta () {
    return {
      title: this.$store.getters['data/metaTitle']
    }
  },
  name: 'App'
}
</script>

<style>
</style>
