/* ============
 * Branch Transformer
 * ============
 *
 * The transformer for a branch.
 */

import Transformer from './BaseTransformer'
import Attendance from '@/models/Attendance'

class AttendanceTransformer extends Transformer {
  /**
   * Method used to transform a fetched attendance.
   *
   * @returns {Attendance} a attendance model.
   */
  static fetch (attendance) {
    return new Attendance({
      id: attendance.id,
      reportedAt: attendance.reported_at,
      meal: attendance.meal,
      overTime: attendance.over_time,
      earlyLeave: attendance.early_leave,
      late: attendance.late,
      userId: attendance.user_id,
      user: attendance.user,
      branch: attendance.branch,
      startTime: attendance.start_time,
      startTimer: attendance.start_timer,
      leaveTime: attendance.leave_time,
      leaveTimer: attendance.leave_timer,
      breakStart: attendance.break_start,
      breakStartTime: attendance.break_start_time,
      breakFinish: attendance.break_finish,
      breakFinishTime: attendance.break_finish_time,
      notes: attendance.notes
    })
  }

  /**
   * Method used to transform a send branch.
   *
   * @returns {Object} The transformed branch.
   */
  static send (attendance) {
    return {
      id: attendance.id,
      meal: attendance.meal,
      over_time: attendance.overTime,
      early_leave: attendance.earlyLeave,
      late: attendance.late,
      user_id: attendance.userId,
      branch_id: attendance.branchId,
      start_time: attendance.startTime + attendance.startTimer,
      leave_time: attendance.leaveTime + attendance.leaveTimer,
      break_start: attendance.breakStart + attendance.breakStartTime,
      break_finish: attendance.breakFinish + attendance.breakFinishTime,
      notes: attendance.notes
    }
  }
}

export default AttendanceTransformer
