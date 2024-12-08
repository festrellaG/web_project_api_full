import express from "express";
import { celebrate, Joi } from "celebrate";

import {
  getUsers,
  createUser,
  getUserById,
  updateProfile,
  updateAvatar,
  getUserMe,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);

router.get("/me", getUserMe);

router.get("/:id", getUserById);

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).optional(),
      about: Joi.string().min(2).max(30).optional(),
      avatar: Joi.string().uri().optional(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  }),
  createUser
);

router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).optional(),
      about: Joi.string().min(2).max(30).optional(),
    }),
  }),
  updateProfile
);

router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().uri().optional(),
    }),
  }),
  updateAvatar
);

export default router;
