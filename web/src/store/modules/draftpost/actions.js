/* ============
 * Post Actions
 * ============
 *
 * The actions available for the post module.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/DraftPostProxy'
import PostTransformer from '@/transformers/PostTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all posts will be fetched.
 *
 * @param {function} commit Commit function to update the store.
 * @param {function} fn Callback to edit the parameters on the proxy.
 */
const all = ({ commit }, fn = null) => {
  if (typeof fn === 'function') {
    fn(proxy)
  }

  proxy.all()
    .then((response) => {
      const data = {
        posts: PostTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when an post will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   post  The post that will be created.
 */
const create = ({ commit }, post) => {
  const transformedPost = PostTransformer.send(post)

  proxy.create(transformedPost)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Post has been created!'
      })

      Vue.router.push({
        name: 'draft.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The post could not be created'
      })
    })
}

/**
 * Action fired when an post has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   post  The post that has been created.
 */
const created = ({ commit }, post) => {
  commit(types.CREATED, PostTransformer.fetch(post))
}

/**
 * Action fired when an post will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   post  The post that will be updated.
 */
const update = ({ commit }, post) => {
  const transformedPost = PostTransformer.send(post)

  proxy.update(post.id, transformedPost)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Post has been updated!'
      })

      Vue.router.push({
        name: 'draft.index',
        params: {
          postId: post.id
        }
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The post could not be updated'
      })
    })
}

/**
 * Action fired when an post has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   post  The post that has been updated.
 */
const updated = ({ commit }, post) => {
  commit(types.UPDATED, PostTransformer.fetch(post))
}

/**
 * Action fired when an post will be destroyed.
 *
 * @param {function} commit    Commit function to update the store.
 * @param {Object}   postId  The post that will be destroyed.
 */
const destroy = ({ commit }, postId) => {
  proxy.destroy(postId)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Post has been destroyed!'
      })

      Vue.router.push({
        name: 'draft.index'
      })
      store.dispatch('draftpost/all')
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The post could not be destroyed'
      })
    })
}

/**
 * Action fired when an post has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   post  The post that has been destroyed.
 */
const destroyed = ({ commit }, post) => {
  commit(types.DESTROYED, PostTransformer.fetch(post))
}

export default {
  all,
  create,
  created,
  update,
  updated,
  destroy,
  destroyed
}
