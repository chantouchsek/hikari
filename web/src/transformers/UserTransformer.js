/* ============
 * User Transformer
 * ============
 *
 * The transformer for a user.
 */

import Transformer from './BaseTransformer'
import User from '@/models/User'

class UserTransformer extends Transformer {
  /**
   * Method used to transform a fetched user.
   *
   * @returns {User} An user model.
   */
  static fetch (user) {
    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      registered: user.registered
    })
  }

  /**
   * Method used to transform a send user.
   *
   * @returns {Object} The transformed user.
   */
  static send (user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      registered: user.registered
    }
  }
}

export default UserTransformer
