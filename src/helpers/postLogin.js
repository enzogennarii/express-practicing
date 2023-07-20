const crypto = require('crypto');

const validateLogin = ({ email, password }) => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) throw new Error('O campo "email" é obrigatório');

  if (!regexEmail.test(email)) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }

  if (!password) throw new Error('O campo "password" é obrigatório');

  if (password.length < 6) {
    throw new Error('O "password" deve ter pelo menos 6 caracteres');
  }
};

const postLogin = (login) => {
  validateLogin(login);
  const token = crypto.randomBytes(8).toString('hex');
  return token;
};

module.exports = postLogin;
