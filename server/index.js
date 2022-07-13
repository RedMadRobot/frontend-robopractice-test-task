const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(
  cors({
    origin: [
      'http://localhost', // prod workflow (port: 80)
      'http://localhost:3000', // dev workflow
      'null' // for local check
    ],
    methods: 'GET',
  })
);

app.get('/api/users', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(require('./data.json'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
