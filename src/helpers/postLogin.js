const crypto = require('crypto');

const postLogin = (body) => {
  console.log(body);
  const token = crypto.randomBytes(8).toString('hex');
  return token;
};

module.exports = postLogin;
