var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_LOCATION: '"http://hikari-food-service.test/"',
  API_CLIENT_ID: '"2"',
  API_CLIENT_SECRET: '"k88CBvCpP4RMiIFNGbQ3wfUbpJ5QYqxagg9yZLrB"',
  BROADCAST_AUTH_ENDPOINT: '"http://hikari-food-service.test/broadcasting/auth"',
  PUSHER_KEY: '"79a17e2b74a93faa8718"',
  PUSHER_CLUSTER: '"mt1"'
})
