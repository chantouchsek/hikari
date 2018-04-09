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
      numberCustomers: dailyreport.number_customers,
      userId: dailyreport.user_id,
      branchId: dailyreport.branch_id,
      customerType: dailyreport.customer_type,
      cost: dailyreport.cost,
      questA: dailyreport.quest_a,
      questB: dailyreport.quest_b,
      notes: dailyreport.notes,
      date: dailyreport.date,
      totalPrice: dailyreport.total_price,
      pricePerCustomer: dailyreport.price_per_customer,
      roughInterest: dailyreport.rough_interest,
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
      number_customers: dailyreport.numberCustomers,
      user_id: dailyreport.userId,
      branch_id: dailyreport.branchId,
      customer_type: dailyreport.customerType,
      cost: dailyreport.cost,
      quest_a: dailyreport.questA,
      quest_b: dailyreport.questB,
      notes: dailyreport.notes,
      date: dailyreport.date,
      total_price: dailyreport.totalPrice,
      price_per_customer: dailyreport.pricePerCustomer,
      rough_interest: dailyreport.roughInterest
    }
  }
}

export default DailyReportTransformer
