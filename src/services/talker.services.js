const { talkerModel } = require('../models');
const applyQueryFilters = require('../helpers/applyQueryFilters');

const getAll = async () => {
  const talkers = await talkerModel.read();
  return talkers || [];
};

const findById = async (id) => {
  const talkers = await getAll();
  const talker = talkers.find((t) => t.id === Number(id));
  if (!talker) {
    throw new Error('Pessoa palestrante não encontrada');
  }
  return talker;
};

const post = async (talker) => {
  const talkersList = await getAll();
  const lastId = [...talkersList].sort((a, b) => b.id - a.id)[0].id;
  const newTalker = { ...talker, id: lastId + 1 };
  const newTalkersList = [...talkersList, newTalker];
  await talkerModel.write(newTalkersList);
  return newTalker;
};

const put = async (id, newData) => {
  const idTalker = Number(id);
  const talkers = await getAll();

  if (!talkers.find((t) => t.id === idTalker)) {
    throw new Error('Pessoa palestrante não encontrada');
  }

  const filteredList = talkers.filter((t) => t.id !== idTalker);
  const updatedTalker = { id: idTalker, ...newData };
  const updatedList = [...filteredList, updatedTalker];
  const sortedList = updatedList.sort((a, b) => a.id - b.id);
  await talkerModel.write(sortedList);

  return updatedTalker;
};

const remove = async (id) => {
  const idTalker = Number(id);
  const talkers = await getAll();

  if (!talkers.find((t) => t.id === idTalker)) {
    throw new Error('Pessoa palestrante não encontrada');
  }

  const filteredList = talkers.filter((t) => t.id !== idTalker);
  await talkerModel.write(filteredList);
};

const patchRate = async (id, rate) => {
  const idTalker = Number(id);
  const talkersList = await getAll();

  const updatedTalkers = talkersList.reduce((acc, curr) => {
    if (curr.id === idTalker) {
      const updated = { ...curr, talk: { ...curr.talk, rate } };
      acc.push(updated);
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);

  await talkerModel.write(updatedTalkers);
};

const getByQuery = async (querys) => {
  const { q, rate, date } = querys;
  const talkers = await getAll();

  if (!q && !rate && !date) {
    return talkers;
  }

  return applyQueryFilters(querys, talkers);
};

const getAllByDB = async () => {
  const talkers = await talkerModel.readDB();
  return talkers;
};

module.exports = {
  getAll,
  findById,
  post,
  put,
  remove,
  patchRate,
  getByQuery,
  getAllByDB,
};
