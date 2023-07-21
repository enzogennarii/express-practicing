const validadeName = (name) => {
  if (!name || name === '') {
    throw new Error('O campo "name" é obrigatório');
  }
  if (name.length < 3) {
    throw new Error('O campo "name" deve ter pelo menos 3 caracteres');
  }
};

const validateAge = (age) => {
  if (!age) {
    throw new Error('O campo "age" é obrigatório');
  }
  if (!Number.isInteger(age) || age < 18) {
    throw new Error('O campo "age" deve ser um número inteiro igual ou maior que 18');
  }
};

const validateWatchedAt = (date) => {
  const regexDate = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!date || date === '') {
    throw new Error('O campo "watchedAt" é obrigatório');
  }

  if (!regexDate.test(date)) {
    throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
  }
};

const validateRate = (rate) => {
  if (!rate) throw new Error('O campo "rate" é obrigatório');

  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    throw new Error('O campo "rate" deve ser um número inteiro entre 1 e 5');
  }
};

const validateTalk = (talk) => {
  if (!talk) throw new Error('O campo "talk" é obrigatório');

  const { watchedAt, rate } = talk;

  validateWatchedAt(watchedAt);
  validateRate(rate);
};

const validateTalker = (req, res, next) => {
  try {
    const newTalker = req.body;
    const { name, age, talk } = newTalker;

    validadeName(name);
    validateAge(age);
    validateTalk(talk);

    next();
  } catch (e) {
    return res.status(400).json(e.message);
  }
};

module.exports = validateTalker;
