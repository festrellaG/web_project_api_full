import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    link: {
      type: String,
      validate: {
        validator: function (v) {
          return /^((https?:)(\/\/\/?)([\w]*(?::[\w]*)?@)?([\d\w\.-]+)(?::(\d+))?)?([\/\\\w\.()-]*)?(?:([?][^#]*)?(#.*)?)*/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
      required: [true, "User avatar URL required"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      default: [],
    },
  },
  { timestamps: true }
);

const Card = mongoose.model("card", cardSchema);
export default Card;
