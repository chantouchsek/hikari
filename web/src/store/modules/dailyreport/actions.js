/* ============
 * DailyReport Actions
 * ============
 *
 * The actions available for the dailyreport module.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/DailyReportProxy'
import DailyReportTransformer from '@/transformers/DailyReportTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all dailyreports will be fetched.
 *
 * @param {function} commit Commit function to update the store.
 * @param {function} fn Callback to edit the parameters on the proxy.
 */
const all = ({ commit }, fn = null) => {
  if (typeof fn === 'function') {
    fn(proxy)
  }

  proxy.all()
    .then((response) => {
      const data = {
        dailyreports: DailyReportTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when an dailyreport will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   dailyreport  The dailyreport that will be created.
 */
const create = ({ commit }, dailyreport) => {
  const transformedDailyReport = DailyReportTransformer.send(dailyreport)

  proxy.create(transformedDailyReport)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'DailyReport has been created!'
      })

      Vue.router.push({
        name: 'dailyreports.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The dailyreport could not be created'
      })
    })
}

/**
 * Action fired when an dailyreport has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   dailyreport  The dailyreport that has been created.
 */
const created = ({ commit }, dailyreport) => {
  commit(types.CREATED, DailyReportTransformer.fetch(dailyreport))
}

/**
 * Action fired when an dailyreport will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   dailyreport  The dailyreport that will be updated.
 */
const update = ({ commit }, dailyreport) => {
  const transformedDailyReport = DailyReportTransformer.send(dailyreport)

  proxy.update(dailyreport.id, transformedDailyReport)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'DailyReport has been updated!'
      })

      Vue.router.push({
        name: 'dailyreports.index',
        params: {
          dailyreportId: dailyreport.id
        }
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The dailyreport could not be updated'
      })
    })
}

/**
 * Action fired when an dailyreport has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   dailyreport  The dailyreport that has been updated.
 */
const updated = ({ commit }, dailyreport) => {
  commit(types.UPDATED, DailyReportTransformer.fetch(dailyreport))
}

/**
 * Action fired when an dailyreport will be destroyed.
 *
 * @param {function} commit    Commit function to update the store.
 * @param {Object}   dailyreportId  The dailyreport that will be destroyed.
 */
const destroy = ({ commit }, dailyreportId) => {
  proxy.destroy(dailyreportId)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'DailyReport has been destroyed!'
      })

      Vue.router.push({
        name: 'dailyreports.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The dailyreport could not be destroyed'
      })
    })
}

/**
 * Action fired when an dailyreport has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   dailyreport  The dailyreport that has been destroyed.
 */
const destroyed = ({ commit }, dailyreport) => {
  commit(types.DESTROYED, DailyReportTransformer.fetch(dailyreport))
}

export default {
  all,
  create,
  created,
  update,
  updated,
  destroy,
  destroyed
}
