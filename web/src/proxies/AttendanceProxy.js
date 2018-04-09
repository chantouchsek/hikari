import Proxy from './BaseProxy'

class AttendanceProxy extends Proxy {
  /**
   * The constructor for the AttendanceProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('attendances', parameters)
  }

  /**
   * Method used to fetch the attached user to the quest.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  findUser (id) {
    return this.submit('get', `/${this.endpoint}/${id}/user`)
  }

  /**
   * Method used to fetch the attached user to the quest.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  findBranch (id) {
    return this.submit('get', `/${this.endpoint}/${id}/branch`)
  }
}

export default AttendanceProxy
