const fs = require('fs').promises;
const path = require('path');
const connection = require('../db/connection');

const read = async () => {
  const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
  return JSON.parse(data);
};

const write = async (content) => {
  await fs.writeFile(
    path.resolve(__dirname, '../talker.json'),
    JSON.stringify(content),
  );
};

const readDB = async () => {
  const [data] = await connection.execute('SELECT * FROM talkers');
  const formatted = data.map((talker) => {
    const { name, age, id, talk_watched_at, talk_rate } = talker;
    return {
      name, age, id,
      talk: {
        watchedAt: talk_watched_at,
        rate: talk_rate,
      },
    };
  });
  return formatted;
};

module.exports = {
  read,
  write,
  readDB,
};
