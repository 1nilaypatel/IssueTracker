import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({message: "Api route is working"});
}

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};