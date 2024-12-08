import express from "express";
import {
  getCards,
  createCard,
  deleteCardById,
  cardLikes,
  cardDislikes,
} from "../controllers/cards.js";
import { celebrate, Joi } from "celebrate";
import validator from "validator";

const router = express.Router();

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

router.get("/", getCards);

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  createCard
);

router.delete(
  "/:id",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24).required(),
    }),
  }),
  deleteCardById
);

router.put(
  "/likes/:cardId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).required(),
    }),
  }),
  cardLikes
);

router.delete(
  "/likes/:cardId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24).required(),
    }),
  }),
  cardDislikes
);

export default router;
