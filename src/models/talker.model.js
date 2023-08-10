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
    const {
      name,
      age,
      id,
      talk_watched_at: watchedAt,
      talk_rate: rate,
    } = talker;
    return { name, age, id, talk: { watchedAt, rate } };
  });
  return formatted;
};

module.exports = {
  read,
  write,
  readDB,
};
