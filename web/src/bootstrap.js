/* ============
 * Bootstrap File
 * ============
 *
 * This will configure and bootstrap the application.
 */

/* ============
 * Vue
 * ============
 *
 * Vue.js is a library for building interactive web interfaces.
 * It provides data-reactive components with a simple and flexible API.
 *
 * http://rc.vuejs.org/guide/
 */
import Vue from 'vue'

/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * Because Vue Resource has been retired, Axios will now been used
 * to perform AJAX-requests.
 *
 * https://github.com/mzabriskie/axios
 */
import Axios from 'axios'
import routes from '@/router'
import VueRouter from 'vue-router'

import BootstrapVue from 'bootstrap-vue'

import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import VueCarousel from 'vue-carousel'

/* ============
 * Vuex Router Sync
 * ============
 *
 * Effortlessly keep vue-router and vuex store in sync.
 *
 * https://github.com/vuejs/vuex-router-sync/blob/master/README.md
 */
import { sync } from 'vuex-router-sync'
import store from '@/store'

/* ============
* DateTimePicker Global register
** ============
 */
import datePicker from 'vue-bootstrap-datetimepicker'

Vue.config.debug = process.env.NODE_ENV !== 'production'

Axios.defaults.baseURL = process.env.API_LOCATION
Axios.defaults.headers.common.Accept = 'application/json'

// Bind Axios to Vue.
Vue.$http = Axios
Object.defineProperty(Vue.prototype, '$http', {
  get () {
    return Axios
  }
})

/* ============
 * Laravel Echo
 * ============
 *
 * Laravel Echo is a JavaScript library that makes it painless to subscribe
 * to channels and listen for events broadcast by Laravel.
 *
 * https://github.com/laravel/echo
 */

window.Pusher = Pusher

const echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.PUSHER_KEY,
  cluster: process.env.PUSHER_CLUSTER,
  authEndpoint: process.env.BROADCAST_AUTH_ENDPOINT
})

// Bind Laravel Echo to Vue.
Vue.$echo = echo
Object.defineProperty(Vue.prototype, '$echo', {
  get () {
    return echo
  }
})

Vue.use(datePicker)
Vue.use(VueCarousel)

store.dispatch('auth/check')

/* ===============
* Vues Router
* ================
*
* The official Router for Vue.js. It deeply integrates with Vue.js core to make building Singple Page Application with Vue.js a breeze.
*
* http://router.vuejs.org/en/inde.html
 */

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 500)
    })
  },
  routes
})

store.dispatch('auth/check')

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth) && !store.state.auth.authenticated) {
    next({
      name: 'LoginPage'
    })
  } else if (to.matched.some(m => m.meta.guest) && store.state.auth.authenticated) {
    next({
      name: 'Home'
    })
  } else {
    next()
  }
})

sync(store, router)

Vue.router = router

Vue.use(BootstrapVue)

export default {
  router
}
