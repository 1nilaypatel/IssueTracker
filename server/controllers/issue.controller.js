import Issue from "../models/issue.model.js";

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