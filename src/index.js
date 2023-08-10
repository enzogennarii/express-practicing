const express = require('express');

const { talkerService, loginService } = require('./services');
const validate = require('./middlewares');

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

// REQUISITO 1
app.get('/talker', async (_req, res) => {
  try {
    const talkers = await talkerService.getAll();
    res.status(HTTP_OK_STATUS).json(talkers);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// REQUISITO 8, 9 E 10
app.get('/talker/search', validate.token, validate.query, async (req, res) => {
  try {
    const searchResult = await talkerService.getByQuery(req.query);
    res.status(200).json(searchResult);
  } catch (e) {
    res.status(500).json({ message: 'Erro inesperado!' });
  }
});

// REQUISITO 12
app.get('/talker/db', async (_req, res) => {
  try {
    const talkers = await talkerService.getAllByDB();
    res.status(200).json(talkers);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// REQUISITO 2
app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talker = await talkerService.findById(id);
    res.status(200).json(talker);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

// REQUISITO 3 E 4
app.post('/login', validate.login, (_req, res) => {
  try {
    const token = loginService.post();
    res.status(200).json({ token });
  } catch (e) {
    res.status(500).json({ message: 'Erro inesperado' });
  }
});

// REQUISITO 5
app.post('/talker', validate.token, validate.talker, async (req, res) => {
  try {
    const newTalker = await talkerService.post(req.body);
    res.status(201).json(newTalker);
  } catch (e) {
    res.status(500).json({ message: 'Erro inesperado' });
  }
});

// REQUISITO 6
app.put('/talker/:id', validate.token, validate.talker, async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updatedTalker = await talkerService.put(id, newData);
    res.status(200).json(updatedTalker);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

// REQUISITO 7
app.delete('/talker/:id', validate.token, async (req, res) => {
  try {
    const { id } = req.params;
    await talkerService.remove(id);
    res.status(204).end();
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

// REQUISITO 11
app.patch('/talker/rate/:id', validate.token, validate.rate, async (req, res) => {
  try {
    const { id } = req.params;
    const { rate } = req.body;
    await talkerService.patchRate(id, rate);
    res.status(204).end();
  } catch (e) {
    res.status(500).json({ message: 'Erro inesperado' });
  }
});
