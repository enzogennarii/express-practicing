const express = require('express');

const getTalkers = require('./helpers/getTalkers');
const getTalkerByID = require('./helpers/getTalkerByID');
const postLogin = require('./helpers/postLogin');
const postTalker = require('./helpers/postTalker');
const validateToken = require('./middlewares/validadeToken');
const validateTalker = require('./middlewares/validateTalker');
const putTalker = require('./helpers/putTalker');
const deleteTalker = require('./helpers/deleteTalker');
const getTalkerByQuery = require('./helpers/getTalkerByQuery');
const validateQuery = require('./middlewares/validateQuery');
const patchRate = require('./helpers/patchRate');

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

// REQUISITO 8, 9 E 10
app.get('/talker/search', validateToken, validateQuery, async (req, res) => {
  try {
    const searchResult = await getTalkerByQuery(req);
    res.status(200).json(searchResult);
  } catch (e) {
    res.status(500).json({ message: 'Erro inesperado!' });
  }
});

// REQUISITO 2
app.get('/talker/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const talker = await getTalkerByID(id);
    res.status(HTTP_OK_STATUS).json(talker);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

// REQUISITO 1
app.get('/talker', async (_req, res) => {
  try {
    const talkers = await getTalkers();
    res.status(HTTP_OK_STATUS).json(talkers);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// REQUISITO 3 E 4
app.post('/login', (req, res) => {
  try {
    const { body } = req;
    const token = postLogin(body);
    res.status(HTTP_OK_STATUS).json({ token });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// REQUISITO 5
app.post('/talker', validateToken, validateTalker, async (req, res) => {
  try {
    const { body } = req;
    const newTalker = body;
    await postTalker(req);
    res.status(201).json(newTalker);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// REQUISITO 6
app.put('/talker/:id', validateToken, validateTalker, async (req, res) => {
  try {
    const updatedTalker = await putTalker(req);
    res.status(200).json(updatedTalker);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

// REQUISITO 7
app.delete('/talker/:id', validateToken, async (req, res) => {
  try {
    await deleteTalker(req);
    res.status(204).end();
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

// REQUISITO 11
app.patch('/talker/rate/:id', validateToken, async (req, res) => {
  try {
    await patchRate(req);
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
});
