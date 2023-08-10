const validateWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;

  const regexDate = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!watchedAt || watchedAt === '') {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!regexDate.test(watchedAt)) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = validateWatchedAt;
