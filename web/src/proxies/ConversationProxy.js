import Proxy from './BaseProxy'

class ConversationProxy extends Proxy {
  /**
   * The constructor for the BranchProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('conversations', parameters)
  }

  /**
   * Method used to fetch the attached user to the quest.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  findChannel (id) {
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
}

export default ConversationProxy
