/* ============
 * Chat Mutations
 * ============
 *
 * The mutations available for the chat module.
 */

import store from '@/store'
import {
  ALL,
  CREATED,
  UPDATED,
  DESTROYED,
  INIT_DATA,
  SEND_MESSAGE,
  SET_FILTER_KEY,
  SELECT_SESSION
} from './mutation-types'

export default {
  /**
   * Mutation to update the store with the fetched chats.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  chats    The fetched chats.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { chats, pagination }) {
    state.all = chats
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an chat has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} chat  The chat that has been created.
   */
  [CREATED] (state, chat) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(chat)
    }
  },

  /**
   * Mutation to respond to the action when an chat has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} chat The chat that has been updated.
   */
  [UPDATED] (state, chat) {
    state.all = state.all.map((item) => {
      if (item.id === chat.id) {
        return chat
      }

      return item
    })
  },

  /**
   * Mutation to respond to the action when an chat has been destroyed.
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

    // Check if the chat is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('chat/all', (proxy) => {
      proxy.setParameter('page', page)
    })
  },
  [INIT_DATA] (state) {
    let data = localStorage.getItem('vue-chat-session')
    if (data) {
      state.sessions = JSON.parse(data)
    }
  },
  [SEND_MESSAGE] ({ sessions, currentSessionId }, content) {
    let session = sessions.find(item => item.id === currentSessionId)
    session.messages.push({
      content: content,
      date: new Date(),
      self: true
    })
  },
  [SELECT_SESSION] (state, id) {
    state.currentSessionId = id
  },
  [SET_FILTER_KEY] (state, value) {
    state.filterKey = value
  }
}
