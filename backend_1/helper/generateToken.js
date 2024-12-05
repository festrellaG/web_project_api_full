import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function generateToken(user) {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
}
