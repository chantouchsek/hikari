/* ============
 * Store Mutations
 * ============
 *
 * The mutations available for the store module.
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
   * Mutation to update the store with the fetched stores.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  stores    The fetched stores.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { stores, pagination }) {
    state.all = stores
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an store has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} store  The store that has been created.
   */
  [CREATED] (state, store) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(store)
    }
  },

  /**
   * Mutation to respond to the action when an store has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} store The store that has been updated.
   */
  [UPDATED] (state, store) {
    state.all = state.all.map((item) => {
      if (item.id === store.id) {
        return store
      }

      return item
    })
  },

  /**
   * Mutation to respond to the action when an store has been destroyed.
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

    // Check if the store is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('store/all', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
