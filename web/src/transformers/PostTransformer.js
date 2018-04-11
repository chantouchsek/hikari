/* ============
 * Post Transformer
 * ============
 *
 * The transformer for a post.
 */

import Transformer from './BaseTransformer'
import Post from '@/models/Post'

class PostTransformer extends Transformer {
  /**
   * Method used to transform a fetched post.
   *
   * @returns {Post} a post model.
   */
  static fetch (post) {
    return new Post({
      id: post.id,
      userId: post.user_id,
      type: post.type,
      comments: post.comments,
      scheduledAt: post.scheduled_at,
      user: post.user,
      updatedAt: post.updated_at
    })
  }

  /**
   * Method used to transform a send post.
   *
   * @returns {Object} The transformed post.
   */
  static send (post) {
    return {
      id: post.id,
      user_id: post.userId,
      type: post.type,
      comments: post.comments,
      scheduled_at: post.scheduledAt
    }
  }
}

export default PostTransformer
