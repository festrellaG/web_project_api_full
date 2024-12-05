import express from "express";
import { login, createUser, getUserMe } from "./controllers/users.js";
import cardRoutes from "./routes/cards.js";
import userRoutes from "./routes/users.js";
import { HttpStatus } from "./enums/http.js";
import mongoose from "mongoose";
import auth from "./middleware/auth.js";
import cors from "cors";

const app = express();

const { PORT = 3000 } = process.env;

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use("/users", userRoutes);
app.use("/cards", cardRoutes);

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
