const readFileTalkers = require('./readFileTalkers');

const getTalkerByQuery = async (req) => {
  const queryTerm = req.query.q;
  const talkersList = await readFileTalkers();
  const talkersResult = talkersList.filter((t) => t.name.includes(queryTerm));

  if (!queryTerm || queryTerm === '') {
    return talkersList;
  }

  return talkersResult;
};

module.exports = getTalkerByQuery;
