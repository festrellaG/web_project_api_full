import express from "express";
import {
  getCards,
  createCard,
  deleteCardById,
  cardLikes,
  cardDislikes,
} from "../controllers/cards.js";

const router = express.Router();

router.get("/", getCards);

router.post("/", createCard);

router.delete("/:id", deleteCardById);

router.put("/likes/:cardId", cardLikes);

router.delete("/likes/:cardId", cardDislikes);

export default router;
