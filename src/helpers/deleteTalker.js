const readFileTalkers = require('./readFileTalkers');
const writeFileTalkers = require('./writeFileTalkers');

const deleteTalker = async (req) => {
  const idTalker = Number(req.params.id);
  const talkersList = await readFileTalkers();

  if (!talkersList.find((t) => t.id === idTalker)) {
    throw new Error('Pessoa palestrante não encontrada');
  }

  const filteredList = talkersList.filter((t) => t.id !== idTalker);
  await writeFileTalkers(filteredList);
};

module.exports = deleteTalker;
