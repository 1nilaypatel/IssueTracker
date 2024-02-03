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
    user.showRedDot = true;
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

export const deleteUser = async (req, res, next) => {
  if(req.user.id !== req.params.id){
    return next(errorHandler(401, "Cannot delete other's account"));
  }
  try{
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User account deleted");
  }catch(error){
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "Unautharized to update others"));
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateUser) {
      return next(errorHandler(404, "User not found"));
    }
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const clearAllNotifications = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(errorHandler(404, "User not found"));
  }
  try {
    user.notifications = [];
    await user.save();
    res.status(200).json("All notifications cleared successfully!");
  } catch (error) {
    next(error);
  }
};

export const resetRedDot = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if(!user){
    return next(errorHandler(404, "User not found"));
  }
  try {
    user.showRedDot = false;
    await user.save();
    res.status(200).json("RedDot reset successfully!");
  } catch (error) {
    next(error);
  }
};