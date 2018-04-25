/* ============
 * Branch Transformer
 * ============
 *
 * The transformer for a branch.
 */

import Transformer from './BaseTransformer'
import Quest from '@/models/Branch'

class DailyReportTransformer extends Transformer {
  /**
   * Method used to transform a fetched dailyreport.
   *
   * @returns {Quest} a dailyreport model.
   */
  static fetch (dailyreport) {
    return new Quest({
      id: dailyreport.id,
      sales: dailyreport.sales,
      totalGuest: dailyreport.total_guest,
      userId: dailyreport.user_id,
      branchId: dailyreport.branch_id,
      date: dailyreport.date,
      guestType: dailyreport.guest_type,
      cost: dailyreport.cost,
      questA: dailyreport.quest_a,
      questB: dailyreport.quest_b,
      questC: dailyreport.quest_c,
      comments: dailyreport.comments,
      unitSale: dailyreport.unit_sale,
      crossProfit: dailyreport.cross_profit,
      branch: dailyreport.branch,
      user: dailyreport.user
    })
  }

  /**
   * Method used to transform a send branch.
   *
   * @returns {Object} The transformed branch.
   */
  static send (dailyreport) {
    return {
      id: dailyreport.id,
      sales: dailyreport.sales,
      total_guest: dailyreport.totalGuest,
      user_id: dailyreport.userId,
      branch_id: dailyreport.branchId,
      guest_type: dailyreport.guestType,
      cost: dailyreport.cost,
      quest_a: dailyreport.questA,
      quest_b: dailyreport.questB,
      quest_c: dailyreport.questC,
      comments: dailyreport.comments,
      date: dailyreport.date,
      unit_sale: dailyreport.unitSale,
      cross_profit: dailyreport.crossProfit
    }
  }
}

export default DailyReportTransformer
