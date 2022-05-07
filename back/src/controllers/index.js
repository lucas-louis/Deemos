const validate = require('../utils/validate')
const starton = require('../services/starton')

const postIdentity = async (req, res) => {
  const validators = {
    query: [
      ['tokenUri', 'string', 'required'],
      ['wallet_address', 'string', 'required'],
      ['expiration', 'string', 'required']
    ]
  }
  if (!validate(req, res, validators)) return res.send({'message': 'invalid fields'})

  const response = await starton.createToken(req.query.wallet_address, req.query.tokenUri, req.query.expiration)
  console.log(response)
  res.send(response)
}

const getIdInfo = async (req, res) => {
  const validators = {
    params: [
      ['id', 'string', 'required'],
    ]
  }

  if (!validate(req, res, validators)) return res.send({'message': 'invalid fields'})
  const response = await starton.getTokenInfos(req.params.id)
  console.log(response)
  res.send(response)
}

module.exports = { postIdentity, getIdInfo }