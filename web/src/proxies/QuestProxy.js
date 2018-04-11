import Proxy from './BaseProxy'

class QuestProxy extends Proxy {
  /**
   * The constructor for the QuestProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('quests', parameters)
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
}

export default QuestProxy
