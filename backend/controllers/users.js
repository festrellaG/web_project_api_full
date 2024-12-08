import User from "../models/user.js";
import { HttpStatus } from "../enums/http.js";
import generateToken from "../helper/generateToken.js";
import bcrypt from "bcrypt";
import BadRequestError from "../errors/bad-request-error.js";
import NotFoundError from "../errors/not-found-error.js";
import UnauthorizedError from "../errors/unauthorized-error.js";

export async function getUsers(req, res) {
  try {
    const users = await User.find({});
    res.status(HttpStatus.OK).send(users);
  } catch (error) {
    next(error);
  }
}

export async function getUserById(req, res) {
  const { id } = req.params;

  try {
    const user = await User.findById(id).orFail();
    res.status(HttpStatus.OK).send(user);
  } catch (error) {
    console.error(error);
    console.log("error name: ", error.name);
    if (error.name === "DocumentNotFoundError") {
      next(new NotFoundError("User not found"));
    } else {
      next(error);
    }
  }
}

export async function createUser(req, res) {
  const { name, about, avatar, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });

    res.status(HttpStatus.CREATED).send(newUser);
  } catch (error) {
    next(new BadRequestError(error.message));
  }
}

export async function updateProfile(req, res) {
  const { name, about } = req.body;
  const id = req.user._id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, about },
      { new: true }
    ).orFail();

    res.status(HttpStatus.OK).send(updatedUser);
  } catch (error) {
    console.error(error);
    if (error.name === "DocumentNotFoundError") {
      next(new NotFoundError("User not found"));
    } else {
      next(new BadRequestError(error.message));
    }
  }
}

export async function updateAvatar(req, res) {
  const { avatar } = req.body;
  const id = req.user._id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatar },
      { new: true }
    ).orFail();

    res.status(HttpStatus.OK).send(updatedUser);
  } catch (error) {
    console.error(error);
    if (error.name === "DocumentNotFoundError") {
      next(new NotFoundError("User not found"));
    } else {
      next(new BadRequestError(error.message));
    }
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken(user);
      res.status(HttpStatus.OK).send({ token });
    })
    .catch((err) => {
      throw new UnauthorizedError(err.message);
    })
    .catch((err) => next(err));
}

export async function getUserMe(req, res) {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id).orFail();
    res.status(HttpStatus.OK).send(user);
  } catch (error) {
    console.error(error);
    if (error.name === "DocumentNotFoundError") {
      next(new NotFoundError("User not found"));
    } else {
      next(error);
    }
  }
}
