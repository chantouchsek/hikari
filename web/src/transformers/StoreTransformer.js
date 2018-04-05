/* ============
 * Artist Transformer
 * ============
 *
 * The transformer for a store.
 */

import Transformer from './BaseTransformer'
import Store from '@/models/Store'

class StoreTransformer extends Transformer {
  /**
   * Method used to transform a fetched store.
   *
   * @returns {Artist} An store model.
   */
  static fetch (store) {
    return new Store({
      id: store.id,
      name: store.name,
      status: store.status,
      registered: store.registered,
      address: store.address
    })
  }

  /**
   * Method used to transform a send store.
   *
   * @returns {Object} The transformed store.
   */
  static send (store) {
    return {
      id: store.id,
      name: store.name,
      status: store.status,
      registered: store.registered,
      address: store.address
    }
  }
}

export default StoreTransformer
