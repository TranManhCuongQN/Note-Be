import { param } from "express-validator";
import { verifyToken } from "../middlewares/token.middleware.js";
import { isObjectId, validate } from "../utils/validator.js";
import express from "express";
import {
  createBoard,
  getAllBoards,
  getFavouriteBoards,
  getOneBoard,
  updateBoard,
  updateFavouritePosition,
  updatePosition,
  deleteBoard,
} from "../controllers/board.controller.js";

const router = express.Router();

router.post("/", verifyToken, createBoard);
router.get("/", verifyToken, getAllBoards);
router.put("/", verifyToken, updatePosition);
router.get("/favourites", verifyToken, getFavouriteBoards);
router.put("/favourites", verifyToken, updateFavouritePosition);
router.get(
  "/:boardId",
  param("boardId").custom((value) => {
    if (!isObjectId(value)) {
      return Promise.reject("invalid id");
    } else return Promise.resolve();
  }),
  validate,
  verifyToken,
  getOneBoard
);

router.put(
  "/:boardId",
  param("boardId").custom((value) => {
    if (!isObjectId(value)) {
      return Promise.reject("invalid id");
    } else return Promise.resolve();
  }),
  validate,
  verifyToken,
  updateBoard
);

router.delete(
  "/:boardId",
  param("boardId").custom((value) => {
    if (!isObjectId(value)) {
      return Promise.reject("invalid id");
    } else return Promise.resolve();
  }),
  validate,
  verifyToken,
  deleteBoard
);

export default router;
