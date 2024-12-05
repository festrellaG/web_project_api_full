import Card from "../models/card.js";
import { HttpStatus } from "../enums/http.js";
import BadRequestError from "../errors/bad-request-error.js";
import ForbiddenError from "../errors/forbidden-error.js";
import NotFoundError from "../errors/not-found-error.js";
import UnauthorizedError from "../errors/unauthorized-error.js";

export async function createCard(req, res) {
  const { name, link } = req.body;
  const owner = req.user._id;

  try {
    const newCard = await Card.create({
      name,
      link,
      owner,
    });

    const loadCard = await Card.findById(newCard._id).populate("owner");

    res.status(HttpStatus.CREATED).send(loadCard);
  } catch (error) {
    /*console.error(error);
    res.status(HttpStatus.BAD_REQUEST).send({ error: error.message });*/
    next(new BadRequestError(error.message));
  }
}

export async function getCards(req, res) {
  try {
    const cards = await Card.find({}).populate("owner");
    res.status(HttpStatus.OK).send(cards);
  } catch (error) {
    /*console.error(error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });*/
    next(error);
  }
}

export async function deleteCardById(req, res) {
  const { id } = req.params;

  try {
    const deletedCard = await Card.findByIdAndDelete(id);

    if (!deletedCard) {
      /*return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: "Card not found" });*/
      return next(new NotFoundError("Card not found"));
    }

    res.status(HttpStatus.OK).send({ message: "Card deleted successfully" });
  } catch (error) {
    /*console.error(error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });*/
    next(error);
  }
}

export async function cardLikes(req, res) {
  const { cardId } = req.params;
  const userId = req.user._id;

  try {
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true }
    )
      .populate("owner")
      .orFail();

    res.status(HttpStatus.OK).send(updatedCard);
  } catch (error) {
    console.error(error);
    if (error.name === "DocumentNotFoundError") {
      /*res.status(HttpStatus.NOT_FOUND).send({ message: "Card not found" });*/
      next(new NotFoundError("Card not found"));
    } else {
      /*res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });*/
      next(error);
    }
  }
}

export async function cardDislikes(req, res) {
  const { cardId } = req.params;
  const userId = req.user._id;

  try {
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true }
    )
      .populate("owner")
      .orFail();

    res.status(HttpStatus.OK).send(updatedCard);
  } catch (error) {
    console.error(error);
    if (error.name === "DocumentNotFoundError") {
      //res.status(HttpStatus.NOT_FOUND).send({ message: "Card not found" });
      next(new NotFoundError("Card not found"));
    } else {
      /*res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });*/
      next(error);
    }
  }
}
