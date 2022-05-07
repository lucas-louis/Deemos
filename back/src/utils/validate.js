function validate(req, res, validators) {
  const locations = ['query', 'params', 'body']

  for (const location of locations) {
    if (!validators[location]) continue
    if (validators[location]) for (let field of validators.body) {
      const val = req[location][field[0]]
      const type = field[1]
      const required = field[2] === 'required'
      const customValidation = field[3]
      if (!required && !val) continue
      if (typeof(val) !== type || (customValidation && !customValidation(val))) {
          res.status(400).send(`missing or wrong field: ${field}`)
          console.log(`missing or wrong field: ${field[0]}`)
          return false
      }
    }
  }
  return true
}

module.exports = validate