const readFileTalkers = require('./readFileTalkers');
const writeFileTalkers = require('./writeFileTalkers');

const postTalker = async (req) => {
  const newTalker = req.body;
  const talkersList = await readFileTalkers();
  const lastId = [...talkersList].sort((a, b) => b.id - a.id)[0].id;
  newTalker.id = lastId + 1;
  const newTalkersList = [...talkersList, newTalker];
  await writeFileTalkers(newTalkersList);
};

module.exports = postTalker;
