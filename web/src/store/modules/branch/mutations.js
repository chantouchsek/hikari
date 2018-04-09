/* ============
 * Branch Mutations
 * ============
 *
 * The mutations available for the branch module.
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
   * Mutation to update the store with the fetched branches.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  branches    The fetched branches.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { branches, pagination }) {
    state.all = branches
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an branch has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} branch  The branch that has been created.
   */
  [CREATED] (state, branch) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(branch)
    }
  },

  /**
   * Mutation to respond to the action when an branch has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} branch The branch that has been updated.
   */
  [UPDATED] (state, branch) {
    state.all = state.all.map((item) => {
      if (item.id === branch.id) {
        return branch
      }

      return item
    })
  },

  /**
   * Mutation to respond to the action when an branch has been destroyed.
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

    // Check if the branch is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('branch/all', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
