import Proxy from './BaseProxy'

class ChatProxy extends Proxy {
  /**
   * The constructor for the BranchProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('chats', parameters)
  }
}

export default ChatProxy
