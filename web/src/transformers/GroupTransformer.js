/* ============
 * Group Transformer
 * ============
 *
 * The transformer for a group.
 */

import Transformer from './BaseTransformer'
import Group from '@/models/Group'

class GroupTransformer extends Transformer {
  /**
   * Method used to transform a fetched group.
   *
   * @returns {Group} a group model.
   */
  static fetch (group) {
    return new Group({
      id: group.id,
      name: group.name,
      status: group.status
    })
  }

  /**
   * Method used to transform a send group.
   *
   * @returns {Object} The transformed group.
   */
  static send (group) {
    return {
      id: group.id,
      name: group.name,
      status: group.status
    }
  }
}

export default GroupTransformer
