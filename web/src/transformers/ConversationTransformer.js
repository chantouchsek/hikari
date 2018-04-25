/* ============
 * Conversation Transformer
 * ============
 *
 * The transformer for a conversation.
 */

import Transformer from './BaseTransformer'
import Conversation from '@/models/Conversation'

class ConversationTransformer extends Transformer {
  /**
   * Method used to transform a fetched conversation.
   *
   * @returns {Conversation} a conversation model.
   */
  static fetch (conversation) {
    return new Conversation({
      id: conversation.id,
      message: conversation.message,
      channelId: conversation.channel_id,
      group: conversation.group,
      conversations: conversation.conversations
    })
  }

  /**
   * Method used to transform a send conversation.
   *
   * @returns {Object} The transformed conversation.
   */
  static send (conversation) {
    return {
      id: conversation.id,
      message: conversation.message,
      channel_id: conversation.channelId,
      images: conversation.images
    }
  }
}

export default ConversationTransformer
