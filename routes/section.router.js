import { param } from "express-validator";
import { verifyToken } from "../middlewares/token.middleware.js";
import { isObjectId, validate } from "../utils/validator.js";
import express from "express";
import {
  createSection,
  deleteSection,
  updateSection,
} from "../controllers/section.controller.js";

const router = express.Router({
  mergeParams: true,
});

router.post(
  "/",
  param("boardId").custom((value) => {
    console.log("value", value);
    if (!isObjectId(value)) {
      return Promise.reject("invalid id");
    } else return Promise.resolve();
  }),
  validate,
  verifyToken,
  createSection
);

router.put(
  "/:sectionId",
  param("boardId").custom((value) => {
    if (!isObjectId(value)) {
      return Promise.reject("invalid board id");
    } else return Promise.resolve();
  }),
  param("sectionId").custom((value) => {
    if (!isObjectId(value)) {
      return Promise.reject("invalid section id");
    } else return Promise.resolve();
  }),
  validate,
  verifyToken,
  updateSection
);

router.delete(
  "/:sectionId",
  param("boardId").custom((value) => {
    if (!isObjectId(value)) {
      return Promise.reject("invalid board id");
    } else return Promise.resolve();
  }),
  param("sectionId").custom((value) => {
    if (!isObjectId(value)) {
      return Promise.reject("invalid section id");
    } else return Promise.resolve();
  }),
  validate,
  verifyToken,
  deleteSection
);

export default router;
