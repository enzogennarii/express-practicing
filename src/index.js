const express = require('express');

const getTalkers = require('./helpers/getTalkers');

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

app.get('/talker', async (_req, res) => {
  try {
    const talkers = await getTalkers();
    res.status(200).json(talkers);
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
});
