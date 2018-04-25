/* ============
 * Application State
 * ============
 *
 * The state of the application module.
 */

export default {
  drawerActive: false,
  alerts: [],
  isJoined: true,
  configDate: {
    format: 'YYYY-MM-DD',
    useCurrent: true,
    showClear: false,
    showClose: false
  },
  configTime: {
    format: 'h:mm:ss',
    useCurrent: true,
    showClear: false,
    showClose: false
  },
  customerType: [
    { text: 'オプションを選択', value: null },
    { text: 'サラリーマン', value: '1' },
    { text: 'OL', value: '2' },
    { text: '大学生', value: '3' },
    { text: 'ファミリー', value: '4' }
  ]
}
