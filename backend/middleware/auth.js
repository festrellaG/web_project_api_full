import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { HttpStatus } from "../enums/http.js";

dotenv.config();
const { NODE_ENV = "local", JWT_SECRET } = process.env;

export default async function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production"
        ? JWT_SECRET
        : "db36f02a4d39f682d4d52abd6fef4df92f1945408b0f22431305beaf1fb2c0bf"
    );
  } catch (error) {
    console.error("JWT verification error:", error);
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send({ message: "Authorization required" });
  }

  req.user = payload;

  next();
}
