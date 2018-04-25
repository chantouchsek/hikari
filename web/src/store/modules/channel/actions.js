/* ============
 * Channel Actions
 * ============
 *
 * The actions available for the channel module.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/ChannelProxy'
import ChannelTransformer from '@/transformers/ChannelTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all channels will be fetched.
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
        channels: ChannelTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when an channel will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   channel  The channel that will be created.
 */
const create = ({ commit }, channel) => {
  const transformedChannel = ChannelTransformer.send(channel)

  proxy.create(transformedChannel)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Channel has been created!'
      })

      Vue.router.push({
        name: 'channels.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The channel could not be created'
      })
    })
}

/**
 * Action fired when an channel has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   channel  The channel that has been created.
 */
const created = ({ commit }, channel) => {
  commit(types.CREATED, ChannelTransformer.fetch(channel))
}

/**
 * Action fired when an channel will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   channel  The channel that will be updated.
 */
const update = ({ commit }, channel) => {
  const transformedChannel = ChannelTransformer.send(channel)

  proxy.update(channel.id, transformedChannel)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Channel has been updated!'
      })

      Vue.router.push({
        name: 'channels.index',
        params: {
          channelId: channel.id
        }
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The channel could not be updated'
      })
    })
}

/**
 * Action fired when an channel will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   channel  The channel that will be updated.
 */
const addUser = ({ commit }, channel) => {
  proxy.addUsers(channel.id, channel)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Channel has been updated!'
      })

      Vue.router.push({
        name: 'channels.show',
        params: {
          channelId: channel.id
        }
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The channel could not be updated'
      })
    })
}

/**
 * Action fired when an channel has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   channel  The channel that has been updated.
 */
const updated = ({ commit }, channel) => {
  commit(types.UPDATED, ChannelTransformer.fetch(channel))
}

/**
 * Action fired when an channel will be destroyed.
 *
 * @param {function} commit    Commit function to update the store.
 * @param {Object}   channelId  The channel that will be destroyed.
 */
const destroy = ({ commit }, channelId) => {
  proxy.destroy(channelId)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Channel has been destroyed!'
      })

      Vue.router.push({
        name: 'channels.index'
      })
      store.dispatch('channel/all')
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The channel could not be destroyed'
      })
    })
}

/**
 * Action fired when an channel has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   channel  The channel that has been destroyed.
 */
const destroyed = ({ commit }, channel) => {
  commit(types.DESTROYED, ChannelTransformer.fetch(channel))
}

export default {
  all,
  create,
  created,
  update,
  updated,
  destroy,
  destroyed,
  addUser
}
