import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
  try {
    const { username, password } = req.body;

    const checkUser = await User.findOne({ username });

    if (checkUser)
      return res.status(400).json({
        message: "Username already exists",
      });

    const user = new User({ username });

    user.setPassword(password);

    const token = jwt.sign({ data: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: "24h",
    });

    await user.save();

    let userObj = user._doc;
    delete userObj.password, delete userObj.salt;

    res.status(201).json({
      user: userObj,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select(
      "username password salt id"
    );

    if (!user)
      return res.status(400).json({
        message: "User not exist",
      });

    if (!user.validatePassword(password))
      return res.status(400).json({
        message: "Wrong Password",
      });

    const token = jwt.sign({ data: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: "24h",
    });

    let userObj = user._doc;
    delete userObj.password, delete userObj.salt;

    res.status(200).json({
      user: userObj,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
