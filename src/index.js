const express = require('express');

const getTalkers = require('./helpers/getTalkers');
const getTalkerByID = require('./helpers/getTalkerByID');
const postLogin = require('./helpers/postLogin');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const talker = await getTalkerByID(id);
    res.status(200).json(talker);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

app.get('/talker', async (_req, res) => {
  try {
    const talkers = await getTalkers();
    res.status(200).json(talkers);
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
});

app.post('/login', (req, res) => {
  try {
    const { body } = req;
    const token = postLogin(body);
    console.log(token);
    res.status(200).json({ token });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});
