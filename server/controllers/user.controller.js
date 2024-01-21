import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

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

export const addNotification = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if(!user){
    return next(errorHandler(404, "User not found"));
  }
  try {
    user.notifications.push(req.body);
    await user.save();
    res.status(200).json("Notification added successfully!");
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  const user = await User.findById(req.params.id, { password: 0 });
  if(!user){
    return next(errorHandler(404, "User not found"));
  }
  try{
    res.status(200).json(user);
  }catch(error){
    next(error);
  }
}