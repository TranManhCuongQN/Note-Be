import { body } from "express-validator";
import { userRegister, userLogin } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/token.middleware.js";
import { validate } from "../utils/validator.js";
import express from "express";

const router = express.Router();
router.post(
  "/signup",
  body("username")
    .isLength({ min: 8 })
    .withMessage("username must be at least 8 characters"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
  validate,
  userRegister
);

router.post(
  "/login",
  body("username")
    .isLength({ min: 8 })
    .withMessage("username must be at least 8 characters"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
  validate,
  userLogin
);

router.post("/verify-token", verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;
