import Proxy from './BaseProxy'

class UserProxy extends Proxy {
  /**
   * The constructor for the UserProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('users', parameters)
  }

  /**
   * Method used to fetch the attached album to the song.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  findStore (id) {
    return this.submit('get', `/${this.endpoint}/${id}/store`)
  }
}

export default UserProxy
