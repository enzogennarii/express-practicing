const readFileTalkers = require('./readFileTalkers');
const writeFileTalkers = require('./writeFileTalkers');

const patchRate = async (req) => {
  const { rate } = req.body;
  const idTalker = Number(req.params.id);
  const talkersList = await readFileTalkers();

  if (rate === undefined) {
    throw new Error('O campo "rate" é obrigatório');
  }

  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    throw new Error('O campo "rate" deve ser um número inteiro entre 1 e 5');
  }

  const updatedTalkers = talkersList.reduce((acc, curr) => {
    if (curr.id === idTalker) {
      curr.talk.rate = rate;
    }
    acc.push(curr);
    return acc;
  }, []);

  await writeFileTalkers(updatedTalkers);
};

module.exports = patchRate;