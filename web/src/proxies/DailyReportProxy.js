import Proxy from './BaseProxy'

class DailyReportProxy extends Proxy {
  /**
   * The constructor for the BranchProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('daily_reports', parameters)
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

export default DailyReportProxy
