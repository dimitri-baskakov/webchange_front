import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * When going with "history" mode, please also make sure "build.publicPath"
   * is set to something other than an empty string.
   * Example: '/' instead of ''
   */
  scrollBehavior: () => ({ y: 0 }),
  routes,
  // Leave these as is and change from quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
})

Router.afterEach((to, from) => {
  // мета тег (заголовок) тайтл и название (заголовок) для страниц
  store.dispatch('data/updateMetaTitle',
    store.getters['data/sections'][to.name]
      // ? store.getters['data/sections'][to.name].label
      ? (to.params.section ? store.getters['data/sections'].personalArea.sections[to.params.section.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() })].label + ' - ' : '') + store.getters['data/sections'][to.name].label
      : 'Webchange'
  )
})

Router.beforeEach((to, from, next) => {
  // console.log(store.getters['auth/loggedIn'])
  // const loggedIn = localStorage.getItem('refresh_token')
  // console.log(to)
  let loggedIn = store.getters['auth/loggedIn']
  if (!loggedIn && localStorage.getItem('refresh_token')) {
    store.dispatch('auth/refreshToken')
      .then(() => {
        loggedIn = store.getters['auth/loggedIn']
        if (to.matched.some(record => record.meta.requiresAuth)) {
          if (!loggedIn && (to.path !== '/login' || to.path !== '/registration')) {
            next({
              path: '/login'
            })
          }
        }
        if (loggedIn && (to.path === '/login' || to.path === '/registration')) {
          next({
            path: '/personal-area'
          })
        }
      })
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn && (to.path !== '/login' || to.path !== '/registration')) {
      next({
        path: '/login'
      })
    }
  }
  if (loggedIn && (to.path === '/login' || to.path === '/registration')) {
    next({
      path: '/personal-area'
    })
  }
  next()
})

export default Router
