import { hashPass } from "../helpers/hash.js";
import { User } from "../models/user.js";

export const createUser = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { login, password, username } = req.body;

    const hashedPassword = await hashPass(password);

    const user = new User({ login, password: hashedPassword, username });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log("getUsers", users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
