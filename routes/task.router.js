import { body, param } from "express-validator";
import { verifyToken } from "../middlewares/token.middleware.js";
import { isObjectId, validate } from "../utils/validator.js";
import {
  createTask,
  updatePossition,
  deleteTask,
  updateTask,
} from "../controllers/task.controller.js";
import express from "express";

const router = express.Router({
  mergeParams: true,
});

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

router.put(
  "/update-position",
  param("boardId").custom((value) => {
    if (!isObjectId(value)) {
      return Promise.reject("invalid board id");
    } else return Promise.resolve();
  }),
  validate,
  verifyToken,
  updatePossition
);

router.delete(
  "/:taskId",
  param("boardId").custom((value) => {
    if (!isObjectId(value)) {
      return Promise.reject("invalid board id");
    } else return Promise.resolve();
  }),
  param("taskId").custom((value) => {
    if (!isObjectId(value)) {
      return Promise.reject("invalid task id");
    } else return Promise.resolve();
  }),
  validate,
  verifyToken,
  deleteTask
);

router.put(
  "/:taskId",
  param("boardId").custom((value) => {
    if (!isObjectId(value)) {
      return Promise.reject("invalid board id");
    } else return Promise.resolve();
  }),
  param("taskId").custom((value) => {
    if (!isObjectId(value)) {
      return Promise.reject("invalid task id");
    } else return Promise.resolve();
  }),
  validate,
  verifyToken,
  updateTask
);

export default router;
