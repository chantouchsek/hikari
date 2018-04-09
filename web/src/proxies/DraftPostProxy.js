import Proxy from './BaseProxy'

class DraftPostProxy extends Proxy {
  /**
   * The constructor for the BranchProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('posts/drafts', parameters)
  }
}

export default DraftPostProxy
