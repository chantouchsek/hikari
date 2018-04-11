/* ============
 * Artist Model
 * ============
 *
 * The model for an artist.
 */

import Model from './BaseModel'

class Store extends Model {
  /**
   * Getter for the full name of the artist.
   *
   * @returns {string} The full name of the artist.
   */
  get storeNname () {
    return `${this.name}`
  }
}

export default Store
