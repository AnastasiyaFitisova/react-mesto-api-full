const jwt = require('jsonwebtoken');

const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET');
  } catch (error) {
    next(new Unauthorized('Необходима авторизация'));
  }
  req.users = payload;
  next();
};

module.exports = { auth };
