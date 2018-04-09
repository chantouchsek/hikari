/* ============
 * Quest Transformer
 * ============
 *
 * The transformer for a quest.
 */

import Transformer from './BaseTransformer'
import Quest from '@/models/Quest'

class QuestTransformer extends Transformer {
  /**
   * Method used to transform a fetched quest.
   *
   * @returns {Quest} a quest model.
   */
  static fetch (quest) {
    return new Quest({
      id: quest.id,
      name: quest.name,
      userId: quest.user_id,
      user: quest.user,
      store: quest.user ? quest.user.store : null,
      questType: quest.quest_type,
      status: quest.status,
      dateTerm: quest.date_term
    })
  }

  /**
   * Method used to transform a send quest.
   *
   * @returns {Object} The transformed quest.
   */
  static send (quest) {
    return {
      id: quest.id,
      name: quest.name,
      user_id: quest.userId,
      quest_type: quest.questType,
      status: quest.status,
      date_term: quest.dateTerm
    }
  }
}

export default QuestTransformer
