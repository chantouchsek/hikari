import Proxy from './BaseProxy'

class PostProxy extends Proxy {
  /**
   * The constructor for the BranchProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('posts', parameters)
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

export default PostProxy
