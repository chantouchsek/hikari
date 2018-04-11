/* ============
 * Vuex Store
 * ============
 *
 * The store of the application
 *
 * http://vuex.vuejs.org/en/index.html
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

// Modules
import auth from './modules/auth'
import user from './modules/user'
import artist from './modules/artist'
import application from './modules/application'
import store from './modules/store'
import timecard from './modules/timecard'
import quest from './modules/quest'
import branch from './modules/branch'
import attendance from './modules/attendance'
import dailyreport from './modules/dailyreport'
import post from './modules/post'
import draftpost from './modules/draftpost'
import chat from './modules/chat'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  /**
   * Assign the modules to the store.
   */
  modules: {
    auth,
    user,
    application,
    artist,
    store,
    timecard,
    quest,
    branch,
    attendance,
    dailyreport,
    post,
    draftpost,
    chat
  },

  /**
   * If strict mode should be enabled.
   */
  strict: debug,

  /**
   * Plugins used in the store.
   */
  plugins: debug ? [createLogger()] : []
})
