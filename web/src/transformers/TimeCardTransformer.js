/* ============
 * TimeCard Transformer
 * ============
 *
 * The transformer for a card.
 */

import Transformer from './BaseTransformer'
import TimeCard from '@/models/TimeCard'

class TimeCardTransformer extends Transformer {
  /**
   * Method used to transform a fetched card.
   *
   * @returns {TimeCard} An card model.
   */
  static fetch (card) {
    return new TimeCard({
      id: card.id,
      dayTime: card.daytime,
      userId: card.user_id,
      user: card.user,
      store: card.user ? card.user.store : null,
      timeType: card.time_type,
      status: card.status
    })
  }

  /**
   * Method used to transform a send card.
   *
   * @returns {Object} The transformed card.
   */
  static send (card) {
    return {
      id: card.id,
      daytime: card.dayTime,
      user_id: card.userId,
      time_type: card.timeType,
      status: card.status
    }
  }
}

export default TimeCardTransformer
