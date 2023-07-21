const readFileTalkers = require('./readFileTalkers');

const applyFilters = ({ q, rate, date }, prevArr) => {
  let resultList = [...prevArr];

  if (q) resultList = resultList.filter((t) => t.name.includes(q));
  if (rate) resultList = resultList.filter((t) => t.talk.rate === Number(rate));
  if (date) resultList = resultList.filter((t) => t.talk.watchedAt === date);

  return resultList;
};

const getTalkerByQuery = async (req) => {
  const { q, rate, date } = req.query;
  const talkersList = await readFileTalkers();

  if (!q && !rate && !date) {
    return talkersList;
  }

  return applyFilters(req.query, talkersList);
};

module.exports = getTalkerByQuery;
