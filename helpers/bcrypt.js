const bcrypt = require('bcryptjs');

const hashPassword = (userPassword) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(userPassword, salt);
  return hash;
};

const comparePassword = async (userPassword, dbPassword) => {
  return await bcrypt.compareSync(userPassword, dbPassword);
};

module.exports = { hashPassword, comparePassword };
