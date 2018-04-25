/* ============
   * Auth Actions
 * ============
 *
 * The actions available for the auth module.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/AuthProxy'
import AuthTransformer from '@/transformers/AuthTransformer'
import GetAuthProxy from '@/proxies/GetAuthProxy'

const proxy = new Proxy()
const getAuthProxy = new GetAuthProxy()

/**
 * Action which will check the authentication.
 *
 * @param {function} commit Commit function to update the store.
 */
export const check = ({ commit }) => {
  commit(types.CHECK)
}

/**
 * Action fired when all branches will be fetched.
 *
 * @param {function} commit Commit function to update the store.
 * @param {function} fn Callback to edit the parameters on the proxy.
 */
const getAuth = ({ commit }, fn = null) => {
  if (typeof fn === 'function') {
    fn(getAuthProxy)
  }
  getAuthProxy.all()
    .then((response) => {
      commit(types.GETAUTH, response)
    })
}

/**
 * Action which will try to login the user.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   payload The payload.
 */
export const login = ({ commit }, payload) => {
  proxy.login(payload)
    .then((response) => {
      commit(types.LOGIN, AuthTransformer.fetch(response))

      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Login successful!'
      })
      store.dispatch('auth/getAuth')
      Vue.router.push({
        name: 'Home'
      })
    })
    .catch((error) => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: error.message
      })
    })
}

/**
 * Action which will try to logout the user.
 *
 * @param {function} commit Commit function to update the store.
 */
export const logout = ({ commit }) => {
  commit(types.LOGOUT)

  store.dispatch('application/addAlert', {
    type: 'success',
    message: 'Logout successful!'
  })

  Vue.router.push({
    name: 'login.index'
  })
}

export default {
  check,
  login,
  logout,
  getAuth
}
