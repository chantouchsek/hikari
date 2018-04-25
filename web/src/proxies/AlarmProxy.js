import Proxy from './BaseProxy'

class AlarmProxy extends Proxy {
  /**
   * The constructor for the BranchProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('alarms', parameters)
  }
}

export default AlarmProxy
