const process = require('process')

const config = {
  STARTON_BASE_URL: process.env.REACT_APP_STARTON_BASE_URL,
  STARTON_API_KEY: process.env.REACT_APP_STARTON_API_KEY,
  STARTON_CONTRACT_URI: process.env.REACT_APP_STARTON_CONTRACT_URI,
  SIGNER_WALLET: process.env.REACT_APP_SIGNER_WALLET,
  PORT: parseInt(process.env.PORT)
}

console.log(config)

module.exports = config