/* ============
 * Chat Mutations
 * ============
 *
 * The mutations available for the chat module.
 */

export const ALL = 'ALL'
export const CREATED = 'CREATED'
export const UPDATED = 'UPDATED'
export const DESTROYED = 'DESTROYED'
export const INIT_DATA = 'INIT_DATE'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const SELECT_SESSION = 'SELECT_SESSION'
export const SET_FILTER_KEY = 'SET_FILTER_KEY'

export default {
  ALL,
  CREATED,
  UPDATED,
  DESTROYED,
  // Just defined new mutation type
  INIT_DATA,
  SEND_MESSAGE,
  SELECT_SESSION,
  SET_FILTER_KEY
}
