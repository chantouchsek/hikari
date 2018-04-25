/* ============
 * Channel Transformer
 * ============
 *
 * The transformer for a channel.
 */

import Transformer from './BaseTransformer'
import Channel from '@/models/Channel'

class ChannelTransformer extends Transformer {
  /**
   * Method used to transform a fetched channel.
   *
   * @returns {Channel} a channel model.
   */
  static fetch (channel) {
    return new Channel({
      id: channel.id,
      name: channel.name,
      isPublic: channel.is_public,
      group: channel.group,
      users: channel.users,
      conversations: channel.conversations
    })
  }

  /**
   * Method used to transform a send channel.
   *
   * @returns {Object} The transformed channel.
   */
  static send (channel) {
    return {
      id: channel.id,
      name: channel.name,
      is_public: channel.isPublic,
      group_id: channel.groupId,
      users: channel.users
    }
  }
}

export default ChannelTransformer
