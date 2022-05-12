const express =  require('express');
const config =  require('./config');
const app = express();
const path = require('path');
const cors = require('cors')

app.use(cors())
app.use('/static', express.static(path.resolve('../front/build/static')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve('../front/build/index.html'))
})

app.get('/dashboard', (req, res) => {
  res.sendFile(path.resolve('../front/build/index.html'))
})

console.log(config)

app.listen(config.PORT, (err) => {
  if (err) {
    console.log(err)
  } else
    console.log(`Server listening on port ${config.PORT}`);
})