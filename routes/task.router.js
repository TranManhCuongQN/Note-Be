import { body } from "express-validator";
import { verifyToken } from "../middlewares/token.middleware.js";
import { isObjectId, validate } from "../utils/validator.js";
import createTask from "../controllers/task.controller.js";

router.post(
  "/",
  param("boardId").custom((value) => {
    if (!isObjectId(value)) {
      return Promise.reject("invalid board id");
    } else return Promise.resolve();
  }),
  body("sectionId").custom((value) => {
    if (!isObjectId(value)) {
      return Promise.reject("invalid section id");
    } else return Promise.resolve();
  }),
  validate,
  verifyToken,
  createTask
);
