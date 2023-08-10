const validateRateAsQuery = (rate) => {
  const hasRate = rate !== undefined;
  const rateQuery = Number(rate);
  const isValidRate = Number.isInteger(rateQuery) && rateQuery >= 1 && rateQuery <= 5;

  if (hasRate && !isValidRate) {
    throw new Error('O campo "rate" deve ser um número inteiro entre 1 e 5');
  }
};

const validateDateAsQuery = (date) => {
  const hasDate = date !== undefined;
  const regexDate = /^\d{2}\/\d{2}\/\d{4}$/;
  const isValidDate = regexDate.test(date) || date === '';

  if (hasDate && !isValidDate) {
    throw new Error('O parâmetro "date" deve ter o formato "dd/mm/aaaa"');
  }
};

const validateQuery = (req, res, next) => {
  try {
    const { rate, date } = req.query;

    if (rate === undefined && date === undefined) {
      return next();
    }

    validateRateAsQuery(rate);
    validateDateAsQuery(date);

    next();
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports = validateQuery;
