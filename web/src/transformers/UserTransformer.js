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
      staffId: user.staff_id,
      birthDate: user.birth_date,
      branch: user.branch,
      branchId: user.branch_id,
      hourlyRate: user.hourly_rate
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
      staff_id: user.staffId,
      branch_id: user.branchId,
      hourly_rate: user.hourlyRate
    }
  }
}

export default UserTransformer
