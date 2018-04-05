import Proxy from './BaseProxy'

class StoreProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('stores', parameters)
  }
}

export default StoreProxy
