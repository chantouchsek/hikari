import Proxy from './BaseProxy'

class GetAuthProxy extends Proxy {
  /**
   * The constructor for the BranchProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('user', parameters)
  }
}

export default GetAuthProxy
