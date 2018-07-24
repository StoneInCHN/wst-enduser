var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL:'"http://stone.yeager.vip/wst-customer"'//测试环境
})
