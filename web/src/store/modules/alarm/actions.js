/* ============
 * Alarm Actions
 * ============
 *
 * The actions available for the alarm module.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/AlarmProxy'
import AlarmTransformer from '@/transformers/AlarmTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all alarms will be fetched.
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
        alarms: AlarmTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when an alarm will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   alarm  The alarm that will be created.
 */
const create = ({ commit }, alarm) => {
  const transformedAlarm = AlarmTransformer.send(alarm)

  proxy.create(transformedAlarm)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Alarm has been created!'
      })

      Vue.router.push({
        name: 'alarms.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The alarm could not be created'
      })
    })
}

/**
 * Action fired when an alarm has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   alarm  The alarm that has been created.
 */
const created = ({ commit }, alarm) => {
  commit(types.CREATED, AlarmTransformer.fetch(alarm))
}

/**
 * Action fired when an alarm will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   alarm  The alarm that will be updated.
 */
const update = ({ commit }, alarm) => {
  const transformedAlarm = AlarmTransformer.send(alarm)

  proxy.update(alarm.id, transformedAlarm)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Alarm has been updated!'
      })

      Vue.router.push({
        name: 'alarms.index',
        params: {
          alarmId: alarm.id
        }
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The alarm could not be updated'
      })
    })
}

/**
 * Action fired when an alarm has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   alarm  The alarm that has been updated.
 */
const updated = ({ commit }, alarm) => {
  commit(types.UPDATED, AlarmTransformer.fetch(alarm))
}

/**
 * Action fired when an alarm will be destroyed.
 *
 * @param {function} commit    Commit function to update the store.
 * @param {Object}   alarmId  The alarm that will be destroyed.
 */
const destroy = ({ commit }, alarmId) => {
  proxy.destroy(alarmId)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Alarm has been destroyed!'
      })

      Vue.router.push({
        name: 'alarms.index'
      })
      store.dispatch('alarm/all')
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The alarm could not be destroyed'
      })
    })
}

/**
 * Action fired when an alarm has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   alarm  The alarm that has been destroyed.
 */
const destroyed = ({ commit }, alarm) => {
  commit(types.DESTROYED, AlarmTransformer.fetch(alarm))
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
