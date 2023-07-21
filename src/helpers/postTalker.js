const readFileTalkers = require('./readFileTalkers');
const writeFileTalkers = require('./writeFileTalkers');

const postTalker = async (req) => {
  const newTalker = req.body;
  const talkersList = await readFileTalkers();
  const lastId = [...talkersList].sort((a, b) => b.id - a.id)[0].id;
  newTalker.id = lastId + 1;
  const newTalkersList = [...talkersList, newTalker];
  console.log('Arquivo anterior: \n', talkersList)
  console.log('Novo arquivo: \n', newTalkersList);
  await writeFileTalkers(newTalkersList);
};

// const teste = {
//   "name": "Talker Teste",
//   "age": 50,
//   "talk": {
//     "watchedAt": "11/11/1111",
//     "rate": 5
//   }
// }

module.exports = postTalker;
