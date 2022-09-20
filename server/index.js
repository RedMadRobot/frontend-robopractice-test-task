const express = require('express')
const cors = require('cors');
const app = express()
const port = 8080

const corsOptions = {
  
};

app.use(cors(corsOptions));

app.get('/api/users', (req, res) => {
  res.send(
      require('./data.json')
  )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
