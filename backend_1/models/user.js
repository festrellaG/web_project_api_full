import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlenght: 2,
    maxlenght: 30,
    required: true,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlenght: 2,
    maxlenght: 30,
    required: true,
    default: "Explorer",
  },
  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: [true, "User avatar URL required"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select("+password");
  if (!user) {
    return Promise.reject(new Error("Incorrect credentials"));
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return Promise.reject(new Error("Incorrect credentials"));
  }

  return user;
};

const User = mongoose.model("user", userSchema);
export default User;
