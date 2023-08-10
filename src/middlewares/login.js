const validateEmail = (email) => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    throw new Error('O campo "email" é obrigatório');
  }
  
  if (!regexEmail.test(email)) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
};

const validatePassword = (password) => {
  if (!password) {
    throw new Error('O campo "password" é obrigatório');
  }
  
  if (password.length < 6) {
    throw new Error('O "password" deve ter pelo menos 6 caracteres');
  }
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  try {
    validateEmail(email);
    validatePassword(password);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }

  next();
};

module.exports = validateLogin;
