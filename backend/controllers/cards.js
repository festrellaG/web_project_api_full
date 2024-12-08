import Card from "../models/card.js";
import { HttpStatus } from "../enums/http.js";
import BadRequestError from "../errors/bad-request-error.js";
import NotFoundError from "../errors/not-found-error.js";

export async function createCard(req, res, next) {
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
    next(new BadRequestError(error.message));
  }
}

export async function getCards(req, res, next) {
  try {
    const cards = await Card.find({}).populate("owner");
    res.status(HttpStatus.OK).send(cards);
  } catch (error) {
    next(error);
  }
}

export async function deleteCardById(req, res, next) {
  const { id } = req.params;

  try {
    const deletedCard = await Card.findByIdAndDelete(id);

    if (!deletedCard) {
      return next(new NotFoundError("Card not found"));
    }

    res.status(HttpStatus.OK).send({ message: "Card deleted successfully" });
  } catch (error) {
    next(error);
  }
}

export async function cardLikes(req, res, next) {
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
      next(new NotFoundError("Card not found"));
    } else {
      next(error);
    }
  }
}

export async function cardDislikes(req, res, next) {
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
      next(new NotFoundError("Card not found"));
    } else {
      next(error);
    }
  }
}
