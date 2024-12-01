import { hashPass } from "../helpers/hash.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";

export const createUser = async (req, res) => {
  try {
    const { password, userName } = req.body;

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this login already exists" });
    }

    const hashedPassword = await hashPass(password);

    const user = new User({ password: hashedPassword, userName });
    await user.save();
    res.status(201).json(user._id);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const loginUsers = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    res.status(201).json(user._id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
