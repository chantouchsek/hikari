/* ============
 * User Model
 * ============
 *
 * The model for a user.
 */

import Model from './BaseModel'

class User extends Model {
  /**
   * Getter for the name of the user.
   *
   * @returns {string} The name of the user.
   */
  get fullName () {
    return `${this.name}`
  }
}

export default User
