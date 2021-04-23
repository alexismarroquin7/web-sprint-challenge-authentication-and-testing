const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/secret');

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn: '1h'
  }
  
  return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = {
  generateToken
}