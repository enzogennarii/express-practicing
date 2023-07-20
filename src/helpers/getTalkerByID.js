const fs = require('fs').promises;
const path = require('path');

const getTalkerByID = async (id) => {
  const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
  const talkers = JSON.parse(data);
  const talker = talkers.find((t) => t.id === id);
  if (!talker || talker === {}) {
    throw new Error('Pessoa palestrante não encontrada');
  }
  return talker;
};

module.exports = getTalkerByID;
