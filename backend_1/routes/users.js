import express from "express";
const { celebrate, Joi } = require("celebrate");

import {
  getUsers,
  createUser,
  getUserById,
  updateProfile,
  updateAvatar,
  getUserMe,
} from "../controllers/users.js";

const router = express.Router();

router.get(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      about: Joi.string().required(),
      avatar: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  getUsers
);

router.get("/me", getUserMe);

router.get("/:id", getUserById);

router.post("/", createUser);

router.patch("/me", updateProfile);

router.patch("/me/avatar", updateAvatar);

export default router;
