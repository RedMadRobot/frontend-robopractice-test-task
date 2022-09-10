const express = require('express')
const cors = require('cors');
const app = express()
const port = 8080


app.use(cors({
  origin: [
    'http://localhost:3006',
    'http://localhost:3000'
  ]
}))

app.get('/api/users', (req, res) => {
  res.send(
      require('./data.json')
  )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})