/* ============
 * Conversation Mutations
 * ============
 *
 * The mutations available for the conversation module.
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
   * Mutation to update the conversation with the fetched conversations.
   *
   * @param {Object} state      The current state of the conversation.
   * @param {Array}  conversations    The fetched conversations.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { conversations, pagination }) {
    state.all = conversations
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an conversation has been created.
   *
   * @param {Object} state   The current state of the conversation.
   * @param {Object} conversation  The conversation that has been created.
   */
  [CREATED] (state, conversation) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(conversation)
    }
  },

  /**
   * Mutation to respond to the action when an conversation has been updated.
   *
   * @param {Object} state  The current state of the conversation.
   * @param {Object} conversation The conversation that has been updated.
   */
  [UPDATED] (state, conversation) {
    state.all = state.all.map((item) => {
      if (item.id === conversation.id) {
        return conversation
      }

      return item
    })
  },

  /**
   * Mutation to respond to the action when an conversation has been destroyed.
   *
   * @param {Object} state The current state of the conversation.
   */
  [DESTROYED] (state) {
    const {
      currentPage,
      totalCount,
      limit,
      totalPages
    } = state.pagination

    let page = currentPage

    // Check if the conversation is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('conversation/all', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
