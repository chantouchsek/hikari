/* ============
 * Attendance Mutations
 * ============
 *
 * The mutations available for the attendance module.
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
   * Mutation to update the store with the fetched attendances.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  attendances    The fetched attendances.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { attendances, pagination }) {
    state.all = attendances
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an attendance has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} attendance  The attendance that has been created.
   */
  [CREATED] (state, attendance) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(attendance)
    }
  },

  /**
   * Mutation to respond to the action when an attendance has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} attendance The attendance that has been updated.
   */
  [UPDATED] (state, attendance) {
    state.all = state.all.map((item) => {
      if (item.id === attendance.id) {
        return attendance
      }

      return item
    })
  },

  /**
   * Mutation to respond to the action when an attendance has been destroyed.
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

    // Check if the attendance is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('attendance/all', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
