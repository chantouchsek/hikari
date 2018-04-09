/* ============
 * Chat Actions
 * ============
 *
 * The actions available for the chat module.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/ChatProxy'
import ChatTransformer from '@/transformers/ChatTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all chats will be fetched.
 *
 * @param {function} commit Commit function to update the store.
 * @param {function} fn     Callback to edit the parameters on the proxy.
 */
const all = ({ commit }, fn = null) => {
  if (typeof fn === 'function') {
    fn(proxy)
  }

  proxy.all()
    .then((response) => {
      const data = {
        chats: ChatTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when an chat will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   chat  The chat that will be created.
 */
const create = ({ commit }, chat) => {
  const transformedChat = ChatTransformer.send(chat)

  proxy.create(transformedChat)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Chat has been created!'
      })

      Vue.router.push({
        name: 'chats.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The chat could not be created'
      })
    })
}

/**
 * Action fired when an chat has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   chat  The chat that has been created.
 */
const created = ({ commit }, chat) => {
  commit(types.CREATED, ChatTransformer.fetch(chat))
}

/**
 * Action fired when an chat will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   chat  The chat that will be updated.
 */
const update = ({ commit }, chat) => {
  const transformedChat = ChatTransformer.send(chat)

  proxy.update(chat.id, transformedChat)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Chat has been updated!'
      })

      Vue.router.push({
        name: 'chats.show',
        params: {
          chatId: chat.id
        }
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The chat could not be updated'
      })
    })
}

/**
 * Action fired when an chat has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   chat  The chat that has been updated.
 */
const updated = ({ commit }, chat) => {
  commit(types.UPDATED, ChatTransformer.fetch(chat))
}

/**
 * Action fired when an chat will be destroyed.
 *
 * @param {function} commit    Commit function to update the store.
 * @param {Object}   chatId  The chat that will be destroyed.
 */
const destroy = ({ commit }, chatId) => {
  proxy.destroy(chatId)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Chat has been destroyed!'
      })

      Vue.router.push({
        name: 'chats.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The chat could not be destroyed'
      })
    })
}

/**
 * Action fired when an chat has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   chat  The chat that has been destroyed.
 */
const destroyed = ({ commit }, chat) => {
  commit(types.DESTROYED, ChatTransformer.fetch(chat))
}

const initData = ({ commit }, fn = null) => {
  if (typeof fn === 'function') {
    fn(proxy)
  }

  proxy.all()
    .then((response) => {
      const data = {
        chats: ChatTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

const sendMessage = ({ commit }, chat) => {
  commit(types.SEND_MESSAGE, chat)
}

const selectSession = ({ commit }, currentSessionId) => {
  commit(types.SELECT_SESSION, currentSessionId)
}

export default {
  all,
  create,
  created,
  update,
  updated,
  destroy,
  destroyed,
  initData,
  sendMessage,
  selectSession
}
