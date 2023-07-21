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

/* 
TESTE SEM ERROS
{
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 5
  }
}
*/

module.exports = postTalker;
