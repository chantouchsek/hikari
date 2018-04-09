/* ============
 * Quest Mutations
 * ============
 *
 * The mutations available for the quest module.
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
   * Mutation to update the store with the fetched quests.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  quests    The fetched quests.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { quests, pagination }) {
    state.all = quests
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an quest has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} quest  The quest that has been created.
   */
  [CREATED] (state, quest) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(quest)
    }
  },

  /**
   * Mutation to respond to the action when an quest has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} quest The quest that has been updated.
   */
  [UPDATED] (state, quest) {
    state.all = state.all.map((item) => {
      if (item.id === quest.id) {
        return quest
      }

      return item
    })
  },

  /**
   * Mutation to respond to the action when an quest has been destroyed.
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

    // Check if the quest is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('timecard/all', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
