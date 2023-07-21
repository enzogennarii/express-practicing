const readFileTalkers = require('./readFileTalkers');

const getTalkers = async () => {
  try {
    return await readFileTalkers();
  } catch (e) {
    return [];
  }
};

module.exports = getTalkers;
