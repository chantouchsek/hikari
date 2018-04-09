/* ============
 * TimeCard Mutations
 * ============
 *
 * The mutations available for the timecard module.
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
   * Mutation to update the store with the fetched time_cards.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  time_cards    The fetched time_cards.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { time_cards, pagination }) {
    state.all = time_cards
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an timecard has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} timecard  The timecard that has been created.
   */
  [CREATED] (state, timecard) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(timecard)
    }
  },

  /**
   * Mutation to respond to the action when an timecard has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} timecard The timecard that has been updated.
   */
  [UPDATED] (state, timecard) {
    state.all = state.all.map((item) => {
      if (item.id === timecard.id) {
        return timecard
      }

      return item
    })
  },

  /**
   * Mutation to respond to the action when an timecard has been destroyed.
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

    // Check if the timecard is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('timecard/all', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
