const readFileTalkers = require('./readFileTalkers');

const getTalkerByID = async (id) => {
  const talkersList = await readFileTalkers();
  const talker = talkersList.find((t) => t.id === id);
  if (!talker || talker === {}) {
    throw new Error('Pessoa palestrante não encontrada');
  }
  return talker;
};

module.exports = getTalkerByID;
