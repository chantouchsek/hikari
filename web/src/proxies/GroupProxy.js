import Proxy from './BaseProxy'

class GroupProxy extends Proxy {
  /**
   * The constructor for the BranchProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('groups', parameters)
  }
}

export default GroupProxy
