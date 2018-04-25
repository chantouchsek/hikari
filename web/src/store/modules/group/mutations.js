/* ============
 * Group Mutations
 * ============
 *
 * The mutations available for the group module.
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
   * Mutation to update the group with the fetched groups.
   *
   * @param {Object} state      The current state of the group.
   * @param {Array}  groups    The fetched groups.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { groups, pagination }) {
    state.all = groups
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an group has been created.
   *
   * @param {Object} state   The current state of the group.
   * @param {Object} group  The group that has been created.
   */
  [CREATED] (state, group) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(group)
    }
  },

  /**
   * Mutation to respond to the action when an group has been updated.
   *
   * @param {Object} state  The current state of the group.
   * @param {Object} group The group that has been updated.
   */
  [UPDATED] (state, group) {
    state.all = state.all.map((item) => {
      if (item.id === group.id) {
        return group
      }

      return item
    })
  },

  /**
   * Mutation to respond to the action when an group has been destroyed.
   *
   * @param {Object} state The current state of the group.
   */
  [DESTROYED] (state) {
    const {
      currentPage,
      totalCount,
      limit,
      totalPages
    } = state.pagination

    let page = currentPage

    // Check if the group is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('group/all', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
