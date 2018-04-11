/* ============
 * Branch Actions
 * ============
 *
 * The actions available for the branch module.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/BranchProxy'
import BranchTransformer from '@/transformers/BranchTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all branches will be fetched.
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
        branches: BranchTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when an branch will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   branch  The branch that will be created.
 */
const create = ({ commit }, branch) => {
  const transformedBranch = BranchTransformer.send(branch)

  proxy.create(transformedBranch)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Branch has been created!'
      })

      Vue.router.push({
        name: 'branches.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The branch could not be created'
      })
    })
}

/**
 * Action fired when an branch has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   branch  The branch that has been created.
 */
const created = ({ commit }, branch) => {
  commit(types.CREATED, BranchTransformer.fetch(branch))
}

/**
 * Action fired when an branch will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   branch  The branch that will be updated.
 */
const update = ({ commit }, branch) => {
  const transformedBranch = BranchTransformer.send(branch)

  proxy.update(branch.id, transformedBranch)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Branch has been updated!'
      })

      Vue.router.push({
        name: 'branches.index',
        params: {
          branchId: branch.id
        }
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The branch could not be updated'
      })
    })
}

/**
 * Action fired when an branch has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   branch  The branch that has been updated.
 */
const updated = ({ commit }, branch) => {
  commit(types.UPDATED, BranchTransformer.fetch(branch))
}

/**
 * Action fired when an branch will be destroyed.
 *
 * @param {function} commit    Commit function to update the store.
 * @param {Object}   branchId  The branch that will be destroyed.
 */
const destroy = ({ commit }, branchId) => {
  proxy.destroy(branchId)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Branch has been destroyed!'
      })

      Vue.router.push({
        name: 'branches.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The branch could not be destroyed'
      })
    })
}

/**
 * Action fired when an branch has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   branch  The branch that has been destroyed.
 */
const destroyed = ({ commit }, branch) => {
  commit(types.DESTROYED, BranchTransformer.fetch(branch))
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
