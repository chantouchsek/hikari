var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_LOCATION: '"http://hikari-food-service.test/"',
  API_CLIENT_ID: '"2"',
  API_CLIENT_SECRET: '"MBsXzrwUEB7NODzOXwVhG3deFy5G8415sS21v5li"',
  BROADCAST_AUTH_ENDPOINT: '""',
  PUSHER_KEY: '""',
  PUSHER_CLUSTER: '"ap1"'
})
