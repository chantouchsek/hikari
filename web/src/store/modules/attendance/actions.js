/* ============
 * Attendance Actions
 * ============
 *
 * The actions available for the attendance module.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/AttendanceProxy'
import AttendanceTransformer from '@/transformers/AttendanceTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all attendances will be fetched.
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
        attendances: AttendanceTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when an attendance will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   attendance  The attendance that will be created.
 */
const create = ({ commit }, attendance) => {
  const transformedAttendance = AttendanceTransformer.send(attendance)

  proxy.create(transformedAttendance)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Attendance has been created!'
      })

      Vue.router.push({
        name: 'attendances.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The attendance could not be created'
      })
    })
}

/**
 * Action fired when an attendance has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   attendance  The attendance that has been created.
 */
const created = ({ commit }, attendance) => {
  commit(types.CREATED, AttendanceTransformer.fetch(attendance))
}

/**
 * Action fired when an attendance will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   attendance  The attendance that will be updated.
 */
const update = ({ commit }, attendance) => {
  const transformedAttendance = AttendanceTransformer.send(attendance)

  proxy.update(attendance.id, transformedAttendance)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Attendance has been updated!'
      })

      Vue.router.push({
        name: 'attendances.index',
        params: {
          attendanceId: attendance.id
        }
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The attendance could not be updated'
      })
    })
}

/**
 * Action fired when an attendance has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   attendance  The attendance that has been updated.
 */
const updated = ({ commit }, attendance) => {
  commit(types.UPDATED, AttendanceTransformer.fetch(attendance))
}

/**
 * Action fired when an attendance will be destroyed.
 *
 * @param {function} commit    Commit function to update the store.
 * @param {Object}   attendanceId  The attendance that will be destroyed.
 */
const destroy = ({ commit }, attendanceId) => {
  proxy.destroy(attendanceId)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Attendance has been destroyed!'
      })

      Vue.router.push({
        name: 'attendances.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The attendance could not be destroyed'
      })
    })
}

/**
 * Action fired when an attendance has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   attendance  The attendance that has been destroyed.
 */
const destroyed = ({ commit }, attendance) => {
  commit(types.DESTROYED, AttendanceTransformer.fetch(attendance))
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
