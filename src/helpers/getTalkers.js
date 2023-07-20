const fs = require('fs').promises;
const path = require('path');

const getTalkers = async () => {
  try {
    const talkers = await fs.readFile(path.resolve(__dirname, '../talker.json'));
    return JSON.parse(talkers);
  } catch (e) {
    return [];
  }
};

module.exports = getTalkers;
