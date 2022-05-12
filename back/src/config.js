const process = require('process')

const config = {
  PORT: parseInt(process.env.PORT)
}

console.log(config)

module.exports = config