const express = require('express');
const { celebrate, Joi } = require('celebrate');

const {
  getCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

const cardRoutes = express.Router();

cardRoutes.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/),
  }),
}), createCard); // создает карточку

cardRoutes.get('/', getCards); // возвращает все карточки

cardRoutes.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
}), deleteCard); // удаляет карточку

cardRoutes.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
}), putLike); // поставить лайк

cardRoutes.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
}), deleteLike); // удалить лайк

module.exports = {
  cardRoutes,
};
