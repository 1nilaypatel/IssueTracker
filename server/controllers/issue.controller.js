import Issue from "../models/issue.model.js";

export const createIssue = async (req, res, next) => {
  try{
    const issue = await Issue.create(req.body);
    return res.status(201).json(issue);
  }catch(error){
    next(error);
  }
};