const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { userRoutes } = require('./routes/users');
const { cardRoutes } = require('./routes/cards');

const { createUser, login } = require('./controllers/users');

const { auth } = require('./middlewares/auth');

const BadRequest = require('./errors/BadRequest');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 4000 } = process.env;

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(cookieParser());

app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use('/users', userRoutes);

app.use('/cards', cardRoutes);

app.use('*', (req, res, next) => {
  next(new BadRequest('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  await app.listen(PORT);
}

main();
