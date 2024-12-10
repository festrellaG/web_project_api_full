import express from "express";
import { login, createUser, getUserMe } from "./controllers/users.js";
import cardRoutes from "./routes/cards.js";
import userRoutes from "./routes/users.js";
import { HttpStatus } from "./enums/http.js";
import mongoose from "mongoose";
import auth from "./middleware/auth.js";
import cors from "cors";
import { errors } from "celebrate";
import { requestLogger, errorLogger } from "./middleware/logger.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const allowedCors = [
  "https://tripletenfes.nex.sh",
  "http://tripletenfes.nex.sh",
  "https://www.tripletenfes.nex.sh",
  "http://www.tripletenfes.nex.sh",
  "http://localhost:3000",
  "http://localhost:3001",
];

app.use(function (req, res, next) {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  next();
});

const { PORT = 3000 } = process.env;

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(requestLogger);
app.use(cors());
app.options("*", cors());

app.use(express.json());

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use("/users", userRoutes);
app.use("/cards", cardRoutes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = HttpStatus.INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === HttpStatus.INTERNAL_SERVER_ERROR
        ? "An error occurred on the server"
        : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
