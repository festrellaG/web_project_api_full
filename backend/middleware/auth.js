import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { HttpStatus } from "../enums/http.js";

dotenv.config();

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
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("JWT verification error:", error);
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send({ message: "Authorization required" });
  }

  req.user = payload;

  next();
}
