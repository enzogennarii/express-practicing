const login = require('./login');
const token = require('./token');
const name = require('./name');
const age = require('./age');
const talk = require('./talk');
const watchedAt = require('./watchedAt');
const rate = require('./rate');
const query = require('./query');

const talker = [name, age, talk, watchedAt, rate];

module.exports = {
  login,
  token,
  name,
  age,
  talk,
  watchedAt,
  rate,
  talker,
  query,
};
