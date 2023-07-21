const fs = require('fs').promises;
const path = require('path');

const writeFileTalkers = async (content) => {
  await fs.writeFile(
    path.resolve(__dirname, '../talker.json'),
    JSON.stringify(content),
  );
};

module.exports = writeFileTalkers;
