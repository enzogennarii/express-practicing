const readFileTalkers = require('./readFileTalkers');
const writeFileTalkers = require('./writeFileTalkers');

const putTalker = async (req) => {
  const newTalkerData = req.body;
  const idTalker = Number(req.params.id);
  const talkersList = await readFileTalkers();

  if (!talkersList.find((t) => t.id === idTalker)) {
    throw new Error('Pessoa palestrante não encontrada');
  }

  const filteredList = talkersList.filter((t) => t.id !== idTalker);
  const updatedTalker = { id: idTalker, ...newTalkerData };
  const updatedList = [...filteredList, updatedTalker];
  const sortedList = updatedList.sort((a, b) => a.id - b.id);
  await writeFileTalkers(sortedList);

  return updatedTalker;
};

module.exports = putTalker;
