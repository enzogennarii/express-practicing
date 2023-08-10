const applyQueryFilters = ({ q, rate, date }, prevArr) => {
  let resultList = [...prevArr];

  if (q) resultList = resultList.filter((t) => t.name.includes(q));
  if (rate) resultList = resultList.filter((t) => t.talk.rate === Number(rate));
  if (date) resultList = resultList.filter((t) => t.talk.watchedAt === date);

  return resultList;
};

module.exports = applyQueryFilters;
