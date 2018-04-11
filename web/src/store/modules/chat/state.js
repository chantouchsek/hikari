/* ============
 * Chat State
 * ============
 *
 * The state of the chat module.
 */

const now = new Date()

export default {
  all: [],
  pagination: {
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 5
  },
  user: {
    name: 'coffce',
    img: '/static/img/avatars/5.jpg'
  },
  sessions: [
    {
      id: 1,
      user: {
        name: '示例介绍',
        img: '/static/img/avatars/2.jpg'
      },
      messages: [
        {
          content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
          date: now
        },
        {
          content: '项目地址: https://github.com/coffcer/vue-chat',
          date: now
        }
      ]
    },
    {
      id: 2,
      user: {
        name: 'webpack',
        img: '/static/img/avatars/3.jpg'
      },
      messages: []
    }
  ],
  currentSessionId: 1,
  filterKey: ''
}
