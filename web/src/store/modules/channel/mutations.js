/* ============
 * Channel Mutations
 * ============
 *
 * The mutations available for the channel module.
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
   * Mutation to update the channel with the fetched channels.
   *
   * @param {Object} state      The current state of the channel.
   * @param {Array}  channels    The fetched channels.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { channels, pagination }) {
    state.all = channels
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an channel has been created.
   *
   * @param {Object} state   The current state of the channel.
   * @param {Object} channel  The channel that has been created.
   */
  [CREATED] (state, channel) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(channel)
    }
  },

  /**
   * Mutation to respond to the action when an channel has been updated.
   *
   * @param {Object} state  The current state of the channel.
   * @param {Object} channel The channel that has been updated.
   */
  [UPDATED] (state, channel) {
    state.all = state.all.map((item) => {
      if (item.id === channel.id) {
        return channel
      }

      return item
    })
  },

  /**
   * Mutation to respond to the action when an channel has been destroyed.
   *
   * @param {Object} state The current state of the channel.
   */
  [DESTROYED] (state) {
    const {
      currentPage,
      totalCount,
      limit,
      totalPages
    } = state.pagination

    let page = currentPage

    // Check if the channel is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('channel/all', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
