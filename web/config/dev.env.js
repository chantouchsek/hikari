var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_LOCATION: '"http://hikari-food-service.test/"',
  API_CLIENT_ID: '"2"',
  API_CLIENT_SECRET: '"pibA4zYd1JGRhKGI4jqhSkYVj1Wt5cRRwUnh5wXE"',
  BROADCAST_AUTH_ENDPOINT: '""',
  PUSHER_KEY: '""',
  PUSHER_CLUSTER: '"ap1"'
})
