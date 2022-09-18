import express from 'express';
import cors from 'cors';
import data from './data.json' assert { type: 'json' };

const app = express();
const port = 8080;

app.use(cors());

app.get('/api/users', (req, res) => {
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
