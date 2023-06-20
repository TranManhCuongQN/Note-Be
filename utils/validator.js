import { validationResult } from "express-validator";
import mongoose from "mongoose";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }

  next();
};

export const isObjectId = (value) => mongoose.Types.ObjectId.isValid(value);
