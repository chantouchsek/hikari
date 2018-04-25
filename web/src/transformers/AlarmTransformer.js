/* ============
 * Alarm Transformer
 * ============
 *
 * The transformer for a alarm.
 */

import Transformer from './BaseTransformer'
import Alarm from '@/models/Alarm'

class AlarmTransformer extends Transformer {
  /**
   * Method used to transform a fetched alarm.
   *
   * @returns {Alarm} a alarm model.
   */
  static fetch (alarm) {
    return new Alarm({
      id: alarm.id,
      message: alarm.message,
      alarmDate: alarm.alarm_date,
      alarmTime: alarm.alarm_time,
      users: alarm.users,
      recipients: alarm.recipients,
      updatedAt: alarm.updated_at
    })
  }

  /**
   * Method used to transform a send alarm.
   *
   * @returns {Object} The transformed alarm.
   */
  static send (alarm) {
    return {
      id: alarm.id,
      message: alarm.message,
      alarm_date: alarm.alarmDate,
      alarm_time: alarm.alarmTime,
      recipients: alarm.recipients,
      recipient: alarm.recipient
    }
  }
}

export default AlarmTransformer
