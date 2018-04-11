/* ============
 * Quest Actions
 * ============
 *
 * The actions available for the quest module.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/QuestProxy'
import QuestTransformer from '@/transformers/QuestTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all quests will be fetched.
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
        quests: QuestTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when an quest will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   quest  The quest that will be created.
 */
const create = ({ commit }, quest) => {
  const transformedQuest = QuestTransformer.send(quest)

  proxy.create(transformedQuest)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Quest has been created!'
      })

      Vue.router.push({
        name: 'quests.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The quest could not be created'
      })
    })
}

/**
 * Action fired when an quest has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   quest  The quest that has been created.
 */
const created = ({ commit }, quest) => {
  commit(types.CREATED, QuestTransformer.fetch(quest))
}

/**
 * Action fired when an quest will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   quest  The quest that will be updated.
 */
const update = ({ commit }, quest) => {
  const transformedQuest = QuestTransformer.send(quest)

  proxy.update(quest.id, transformedQuest)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Quest has been updated!'
      })

      Vue.router.push({
        name: 'quests.index',
        params: {
          questId: quest.id
        }
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The quest could not be updated'
      })
    })
}

/**
 * Action fired when an quest has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   quest  The quest that has been updated.
 */
const updated = ({ commit }, quest) => {
  commit(types.UPDATED, QuestTransformer.fetch(quest))
}

/**
 * Action fired when an quest will be destroyed.
 *
 * @param {function} commit    Commit function to update the store.
 * @param {Object}   questId  The quest that will be destroyed.
 */
const destroy = ({ commit }, questId) => {
  proxy.destroy(questId)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Quest has been destroyed!'
      })

      Vue.router.push({
        name: 'quests.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The quest could not be destroyed'
      })
    })
}

/**
 * Action fired when an quest has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   quest  The quest that has been destroyed.
 */
const destroyed = ({ commit }, quest) => {
  commit(types.DESTROYED, QuestTransformer.fetch(quest))
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
