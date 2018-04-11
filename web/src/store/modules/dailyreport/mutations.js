/* ============
 * DailyReport Mutations
 * ============
 *
 * The mutations available for the DailyReport module.
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
   * Mutation to update the store with the fetched dailyreports.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  dailyreports    The fetched dailyreports.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { dailyreports, pagination }) {
    state.all = dailyreports
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an dailyreport has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} dailyreport  The dailyreport that has been created.
   */
  [CREATED] (state, dailyreport) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(dailyreport)
    }
  },

  /**
   * Mutation to respond to the action when an dailyreport has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} dailyreport The dailyreport that has been updated.
   */
  [UPDATED] (state, dailyreport) {
    state.all = state.all.map((item) => {
      if (item.id === dailyreport.id) {
        return dailyreport
      }

      return item
    })
  },

  /**
   * Mutation to respond to the action when an dailyreport has been destroyed.
   *
   * @param {Object} state The current state of the store.
   */
  [DESTROYED] (state) {
    const {
      currentPage,
      totalCount,
      limit,
      totalPages
    } = state.pagination

    let page = currentPage

    // Check if the dailyreport is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('dailyreport/all', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
