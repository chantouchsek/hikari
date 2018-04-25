/* ============
 * Alarm Mutations
 * ============
 *
 * The mutations available for the alarm module.
 */

import store from '@/store'
import {
  ALL,
  CREATED,
  UPDATED,
  DESTROYED
} from './mutation-types'

export default {
  /**
   * Mutation to update the alarm with the fetched alarms.
   *
   * @param {Object} state      The current state of the alarm.
   * @param {Array}  alarms    The fetched alarms.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { alarms, pagination }) {
    state.all = alarms
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an alarm has been created.
   *
   * @param {Object} state   The current state of the alarm.
   * @param {Object} alarm  The alarm that has been created.
   */
  [CREATED] (state, alarm) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(alarm)
    }
  },

  /**
   * Mutation to respond to the action when an alarm has been updated.
   *
   * @param {Object} state  The current state of the alarm.
   * @param {Object} alarm The alarm that has been updated.
   */
  [UPDATED] (state, alarm) {
    state.all = state.all.map((item) => {
      if (item.id === alarm.id) {
        return alarm
      }

      return item
    })
  },

  /**
   * Mutation to respond to the action when an alarm has been destroyed.
   *
   * @param {Object} state The current state of the alarm.
   */
  [DESTROYED] (state) {
    const {
      currentPage,
      totalCount,
      limit,
      totalPages
    } = state.pagination

    let page = currentPage

    // Check if the alarm is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('alarm/all', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
