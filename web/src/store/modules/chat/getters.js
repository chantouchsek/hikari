export default {
  user: ({ user }) => user,
  session: ({ sessions, currentSessionId }) => sessions.find(session => session.id === currentSessionId),
  filterKey: ({ filterKey }) => filterKey,
  sessions: ({ sessions, filterKey }) => {
    return sessions.filter(session => session.user.name.includes(filterKey))
  },
  currentId: ({ currentSessionId }) => currentSessionId
}
