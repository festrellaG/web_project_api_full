import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { NODE_ENV, JWT_SECRET } = process.env;

export default function generateToken(user) {
  const token = jwt.sign(
    { _id: user._id },
    NODE_ENV === "production"
      ? JWT_SECRET
      : "db36f02a4d39f682d4d52abd6fef4df92f1945408b0f22431305beaf1fb2c0bf",
    {
      expiresIn: "7d",
    }
  );
  return token;
}
