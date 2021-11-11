const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secret';

const generateToken = () => {
  const payload = {
    id: this.id,
    email: this.email,
    username: this.username,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { generateToken, verifyToken };
