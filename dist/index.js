
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./orion-trading-sdk.cjs.production.min.js')
} else {
  module.exports = require('./orion-trading-sdk.cjs.development.js')
}
