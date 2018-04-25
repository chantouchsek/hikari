/* ============
 * Group Actions
 * ============
 *
 * The actions available for the group module.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/GroupProxy'
import GroupTransformer from '@/transformers/GroupTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all groups will be fetched.
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
        groups: GroupTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when an group will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   group  The group that will be created.
 */
const create = ({ commit }, group) => {
  const transformedGroup = GroupTransformer.send(group)

  proxy.create(transformedGroup)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Group has been created!'
      })

      Vue.router.push({
        name: 'groups.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The group could not be created'
      })
    })
}

/**
 * Action fired when an group has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   group  The group that has been created.
 */
const created = ({ commit }, group) => {
  commit(types.CREATED, GroupTransformer.fetch(group))
}

/**
 * Action fired when an group will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   group  The group that will be updated.
 */
const update = ({ commit }, group) => {
  const transformedGroup = GroupTransformer.send(group)

  proxy.update(group.id, transformedGroup)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Group has been updated!'
      })

      Vue.router.push({
        name: 'groups.index',
        params: {
          groupId: group.id
        }
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The group could not be updated'
      })
    })
}

/**
 * Action fired when an group has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   group  The group that has been updated.
 */
const updated = ({ commit }, group) => {
  commit(types.UPDATED, GroupTransformer.fetch(group))
}

/**
 * Action fired when an group will be destroyed.
 *
 * @param {function} commit    Commit function to update the store.
 * @param {Object}   groupId  The group that will be destroyed.
 */
const destroy = ({ commit }, groupId) => {
  proxy.destroy(groupId)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Group has been destroyed!'
      })

      Vue.router.push({
        name: 'groups.index'
      })
      store.dispatch('group/all')
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The group could not be destroyed'
      })
    })
}

/**
 * Action fired when an group has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   group  The group that has been destroyed.
 */
const destroyed = ({ commit }, group) => {
  commit(types.DESTROYED, GroupTransformer.fetch(group))
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
