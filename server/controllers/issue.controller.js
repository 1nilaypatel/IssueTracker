import Issue from "../models/issue.model.js";
import { errorHandler } from "../utils/error.js";

export const createIssue = async (req, res, next) => {
  try{
    const issue = await Issue.create(req.body);
    return res.status(201).json(issue);
  }catch(error){
    next(error);
  }
};

export const getIssues = async (req, res, next) => {
  try {
    const issues = await Issue.find();
    return res.status(200).json(issues);
  } catch (error) {
    next(error);
  }
};

export const deleteIssue = async (req, res, next) => {
  const issue = await Issue.findById(req.params.id);
  if(!issue){
    return next(errorHandler(404, "Issue not found!"));
  }
  if(req.user.id !== issue.userRef){
    return next(errorHandler(401, "You can only delete your own issues!"));
  }
  try{
    await Issue.findByIdAndDelete(req.params.id);
    res.status(200).json("Issue has been deleted!");
  }catch(error){
    next(error);
  }
};

export const updateIssue = async (req, res, next) => {
  const issue = await Issue.findById(req.params.id);
  if(!issue){
    return next(errorHandler(404, "Issue not found"));
  }
  if(req.user.id !== issue.userRef && req.user.id !== issue.assigneeId){
    return next(errorHandler(401, "Only creator and assignee can update issue"));
  }
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    );
    res.status(200).json(updatedIssue);
  } catch (error) {
    next(error);
  }
};