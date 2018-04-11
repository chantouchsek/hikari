import Proxy from './BaseProxy'

class TimeCardProxy extends Proxy {
  /**
   * The constructor for the TimeCardProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('time_cards', parameters)
  }

  /**
   * Method used to fetch the attached user to the time card.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  findUser (id) {
    return this.submit('get', `/${this.endpoint}/${id}/user`)
  }
}

export default TimeCardProxy
