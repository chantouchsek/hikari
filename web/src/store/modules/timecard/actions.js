/* ============
 * TimeCard Actions
 * ============
 *
 * The actions available for the card module.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/TimeCardProxy'
import TimeCardTransformer from '@/transformers/TimeCardTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all time_cards will be fetched.
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
        time_cards: TimeCardTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when an card will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   card  The card that will be created.
 */
const create = ({ commit }, card) => {
  const transformedTimeCard = TimeCardTransformer.send(card)

  proxy.create(transformedTimeCard)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'TimeCard has been created!'
      })

      Vue.router.push({
        name: 'time_cards.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The card could not be created'
      })
    })
}

/**
 * Action fired when an card has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   card  The card that has been created.
 */
const created = ({ commit }, card) => {
  commit(types.CREATED, TimeCardTransformer.fetch(card))
}

/**
 * Action fired when an card will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   card  The card that will be updated.
 */
const update = ({ commit }, card) => {
  const transformedTimeCard = TimeCardTransformer.send(card)

  proxy.update(card.id, transformedTimeCard)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'TimeCard has been updated!'
      })

      Vue.router.push({
        name: 'time_cards.index',
        params: {
          cardId: card.id
        }
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The card could not be updated'
      })
    })
}

/**
 * Action fired when an card has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   card  The card that has been updated.
 */
const updated = ({ commit }, card) => {
  commit(types.UPDATED, TimeCardTransformer.fetch(card))
}

/**
 * Action fired when an card will be destroyed.
 *
 * @param {function} commit    Commit function to update the store.
 * @param {Object}   cardId  The card that will be destroyed.
 */
const destroy = ({ commit }, cardId) => {
  proxy.destroy(cardId)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'TimeCard has been destroyed!'
      })

      Vue.router.push({
        name: 'time_cards.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The card could not be destroyed'
      })
    })
}

/**
 * Action fired when an card has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   card  The card that has been destroyed.
 */
const destroyed = ({ commit }, card) => {
  commit(types.DESTROYED, TimeCardTransformer.fetch(card))
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
