import Proxy from './BaseProxy'

class ChannelProxy extends Proxy {
  /**
   * The constructor for the BranchProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('channels', parameters)
  }

  /**
   * Method used to fetch the attached user to the quest.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  findGroup (id) {
    return this.submit('get', `/${this.endpoint}/${id}/group`)
  }

  /**
   * Method used to fetch the attached user to the quest.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  findUsers (id) {
    return this.submit('get', `/${this.endpoint}/${id}/users`)
  }

  addUsers (id, item) {
    return this.submit('patch', `/${this.endpoint}/${id}/users`, item)
  }

  /**
   * Method used to fetch the attached user to the quest.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  findConversations (id) {
    return this.submit('get', `/${this.endpoint}/${id}/conversations`)
  }
}

export default ChannelProxy
