/* ============
 * Branch Transformer
 * ============
 *
 * The transformer for a branch.
 */

import Transformer from './BaseTransformer'
import Quest from '@/models/Branch'

class BranchTransformer extends Transformer {
  /**
   * Method used to transform a fetched branch.
   *
   * @returns {Quest} a branch model.
   */
  static fetch (branch) {
    return new Quest({
      id: branch.id,
      name: branch.name,
      superUserDailyReportTemplate: branch.super_user_daily_report_template,
      managerDailyReportTemplate: branch.manager_daily_report_template,
      subManagerDailyReportTemplate: branch.sub_manager_daily_report_template,
      fullTimeStaffDailyReportTemplate: branch.full_time_staff_daily_report_template,
      partTimeStaffDailyReportTemplate: branch.part_time_staff_daily_report_template,
      status: branch.status,
      registrationDate: branch.registration_date,
      thumbnailId: branch.thumbnail_id
    })
  }

  /**
   * Method used to transform a send branch.
   *
   * @returns {Object} The transformed branch.
   */
  static send (branch) {
    return {
      id: branch.id,
      name: branch.name,
      super_user_daily_report_template: branch.superUserDailyReportTemplate,
      manager_daily_report_template: branch.managerDailyReportTemplate,
      sub_manager_daily_report_template: branch.subManagerDailyReportTemplate,
      full_time_staff_daily_report_template: branch.fullTimeStaffDailyReportTemplate,
      part_time_staff_daily_report_template: branch.partTimeStaffDailyReportTemplate,
      status: branch.status,
      thumbnail_id: branch.thumbnailId
    }
  }
}

export default BranchTransformer
