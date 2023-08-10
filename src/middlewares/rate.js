const isInvalidRate = (rate) => !Number.isInteger(rate) || rate < 1 || rate > 5;

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk || req.body;

  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  if (isInvalidRate(rate)) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  next();
};

module.exports = validateRate;
