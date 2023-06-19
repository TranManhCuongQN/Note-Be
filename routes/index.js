import express from "express";
import userRouter from "./auth.router.js";

const router = express.Router();
router.use("/users", userRouter);

export default router;