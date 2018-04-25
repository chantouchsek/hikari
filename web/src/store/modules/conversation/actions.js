/* ============
 * Conversation Actions
 * ============
 *
 * The actions available for the conversation module.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/ConversationProxy'
import ConversationTransformer from '@/transformers/ConversationTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all conversations will be fetched.
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
        conversations: ConversationTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when an conversation will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   conversation  The conversation that will be created.
 */
const create = ({ commit }, conversation) => {
  // const transformedConversation = ConversationTransformer.send(conversation)

  proxy.create(conversation)
    .then((data) => {
      console.log(data)
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Conversation has been created!'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The conversation could not be created'
      })
    })
}

/**
 * Action fired when an conversation has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   conversation  The conversation that has been created.
 */
const created = ({ commit }, conversation) => {
  commit(types.CREATED, ConversationTransformer.fetch(conversation))
}

/**
 * Action fired when an conversation will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   conversation  The conversation that will be updated.
 */
const update = ({ commit }, conversation) => {
  const transformedConversation = ConversationTransformer.send(conversation)

  proxy.update(conversation.id, transformedConversation)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Conversation has been updated!'
      })

      Vue.router.push({
        name: 'conversations.index',
        params: {
          conversationId: conversation.id
        }
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The conversation could not be updated'
      })
    })
}

/**
 * Action fired when an conversation has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   conversation  The conversation that has been updated.
 */
const updated = ({ commit }, conversation) => {
  commit(types.UPDATED, ConversationTransformer.fetch(conversation))
}

/**
 * Action fired when an conversation will be destroyed.
 *
 * @param {function} commit    Commit function to update the store.
 * @param {Object}   conversationId  The conversation that will be destroyed.
 */
const destroy = ({ commit }, conversationId) => {
  proxy.destroy(conversationId)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Conversation has been destroyed!'
      })

      Vue.router.push({
        name: 'conversations.index'
      })
      store.dispatch('conversation/all')
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The conversation could not be destroyed'
      })
    })
}

/**
 * Action fired when an conversation has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   conversation  The conversation that has been destroyed.
 */
const destroyed = ({ commit }, conversation) => {
  commit(types.DESTROYED, ConversationTransformer.fetch(conversation))
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
