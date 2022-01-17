import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import { MD5, SHA1, SHA256 } from 'crypto-js';

const app = express();
const port: number = 8080;
const dbUri: string = 'mongodb://localhost:27017';

app.use(express.json());
app.use(cors());

let dbClient;
const loadDbClient = async () => {
  if (!dbClient) {
    const client = new MongoClient(dbUri);
    await client.connect();
    dbClient = client.db('hash').collection('hash');
  }
}

app.post('/hash', async (req, res) => {
  if (!req.body || !req.body.hash) {
    res.status(406).send('You must provide an hash!');
    return;
  }
  const hash = req.body.hash;
  dbClient.findOne({
    $or:[
      {"passwordMD5": hash},
      {"passwordSHA1": hash},
      {"passwordSHA256": hash}
    ]
  },
  (_, data) => {
    if (!data) {
      res.status(204).send('No password record found!');
    } else {
      const password = data['password'];
      res.status(200).send(password);
    }
  });
});

app.post('/password', async (req, res) => {
  if (!req.body || !req.body.password) {
    res.status(406).send('You must provide a password!');
    return;
  }
  const password = req.body.password;
  res.setHeader('Content-Type', 'application/json');
  dbClient.findOne({
    "password": password
  },
  (_, data) => {
    if (data) {
      res.status(200).send(data);
    } else {
      const newData = {
        "password": password,
        "passwordMD5": MD5(password).toString(),
        "passwordSHA1": SHA1(password).toString(),
        "passwordSHA256": SHA256(password).toString()
      };
      dbClient.insertOne(newData);
      res.status(201).send(newData);
    }
  });
});

(async () => {
  await loadDbClient();
  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });  
})();
