/* ============
 * Post Mutations
 * ============
 *
 * The mutations available for the post module.
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
   * Mutation to update the store with the fetched post.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  posts    The fetched posts.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { posts, pagination }) {
    state.all = posts
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an post has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} post  The post that has been created.
   */
  [CREATED] (state, post) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(post)
    }
  },

  /**
   * Mutation to respond to the action when an post has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} post The post that has been updated.
   */
  [UPDATED] (state, post) {
    state.all = state.all.map((item) => {
      if (item.id === post.id) {
        return post
      }

      return item
    })
  },

  /**
   * Mutation to respond to the action when an post has been destroyed.
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

    // Check if the post is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('post/all', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
