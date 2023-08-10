const crypto = require('crypto');

const post = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
};

module.exports = {
  post,
};
