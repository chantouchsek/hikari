/* ============
 * Store Actions
 * ============
 *
 * The actions available for the store module.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import storeVuex from '@/store'
import Proxy from '@/proxies/StoreProxy'
import StoreTransformer from '@/transformers/StoreTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all stores will be fetched.
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
        stores: StoreTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when an store will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   store  The store that will be created.
 */
const create = ({ commit }, store) => {
  const transformedStore = StoreTransformer.send(store)

  proxy.create(transformedStore)
    .then(() => {
      storeVuex.dispatch('application/addAlert', {
        type: 'success',
        message: 'Store has been created!'
      })

      Vue.router.push({
        name: 'stores.index'
      })
    })
    .catch(() => {
      storeVuex.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The store could not be created'
      })
    })
}

/**
 * Action fired when an store has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   store  The store that has been created.
 */
const created = ({ commit }, store) => {
  commit(types.CREATED, StoreTransformer.fetch(store))
}

/**
 * Action fired when an store will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   store  The store that will be updated.
 */
const update = ({ commit }, store) => {
  const transformedStore = StoreTransformer.send(store)

  proxy.update(store.id, transformedStore)
    .then(() => {
      storeVuex.dispatch('application/addAlert', {
        type: 'success',
        message: 'Store has been updated!'
      })

      Vue.router.push({
        name: 'stores.index'
      })
    })
    .catch(() => {
      storeVuex.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The store could not be updated'
      })
    })
}

/**
 * Action fired when an store has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   store  The store that has been updated.
 */
const updated = ({ commit }, store) => {
  commit(types.UPDATED, StoreTransformer.fetch(store))
}

/**
 * Action fired when an store will be destroyed.
 *
 * @param {function} commit    Commit function to update the store.
 * @param {Object}   storeId  The store that will be destroyed.
 */
const destroy = ({ commit }, storeId) => {
  proxy.destroy(storeId)
    .then(() => {
      storeVuex.dispatch('application/addAlert', {
        type: 'success',
        message: 'Store has been destroyed!'
      })

      Vue.router.push({
        name: 'stores.index'
      })
    })
    .catch(() => {
      storeVuex.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The store could not be destroyed'
      })
    })
}

/**
 * Action fired when an store has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   store  The store that has been destroyed.
 */
const destroyed = ({ commit }, store) => {
  commit(types.DESTROYED, StoreTransformer.fetch(store))
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
