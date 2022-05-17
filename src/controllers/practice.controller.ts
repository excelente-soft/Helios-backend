import { NextFunction, Request, Response } from 'express';

import { Services } from '@services';
import { Utils } from '@utils';

const createPractice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.body;
    Utils.Validator.validateBody({ courseId }, 'CourseIdSchema');
    const createPracticeResult = await Services.Practice.createPractice(courseId);
    return Utils.Sender.sendToClient(res, createPracticeResult);
  } catch (err) {
    next(err);
  }
};

const changePractice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, link, name, objective, objectiveType } = req.body;
    Utils.Validator.validateBody({ id, link, name, objective, objectiveType }, 'ChangePracticeSchema');
    const changePracticeResult = await Services.Practice.changePractice(id, link, name, objective, objectiveType);
    return Utils.Sender.sendToClient(res, changePracticeResult);
  } catch (err) {
    next(err);
  }
};

const deletePractice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    Utils.Validator.validateBody({ id }, 'IdSchema');
    const deletePracticeResult = await Services.Practice.deletePractice(id);
    return Utils.Sender.sendToClient(res, deletePracticeResult);
  } catch (err) {
    next(err);
  }
};

const getPreparedPractice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    Utils.Validator.validateBody({ id }, 'IdSchema');
    const preparedPractice = await Services.Practice.getPreparedPractice(id, req.user || '');
    return Utils.Sender.sendToClient(res, preparedPractice);
  } catch (err) {
    next(err);
  }
};

const submitPractice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { practiceId, link } = req.body;
    const submitPracticeResult = await Services.Practice.submitPractice(practiceId, link, req.user || '');
    return Utils.Sender.sendToClient(res, submitPracticeResult);
  } catch (err) {
    next(err);
  }
};

const getFeedbacks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const submitPracticeResult = await Services.Practice.getFeedbacks();
    return Utils.Sender.sendToClient(res, submitPracticeResult);
  } catch (err) {
    next(err);
  }
};

const getTaskQueue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskQueue = await Services.Practice.getTaskQueue();
    return Utils.Sender.sendToClient(res, taskQueue);
  } catch (err) {
    next(err);
  }
};

const getTaskReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    Utils.Validator.validateBody({ id }, 'IdSchema');
    const taskToReview = await Services.Practice.getTaskReview(id);
    return Utils.Sender.sendToClient(res, taskToReview);
  } catch (err) {
    next(err);
  }
};

const submitFeedback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, rating, review } = req.body;
    Utils.Validator.validateBody({ id, rating, review }, 'SubmitFeedbackSchema');
    const taskToReview = await Services.Practice.submitFeedback(id, review, rating);
    return Utils.Sender.sendToClient(res, taskToReview);
  } catch (err) {
    next(err);
  }
};

const userFeedbacks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId, practiceId } = req.params;
    Utils.Validator.validateBody({ courseId, practiceId }, 'UserFeedbacksSchema');
    const taskToReview = await Services.Practice.userFeedbacks(courseId, practiceId, req.user || '');
    return Utils.Sender.sendToClient(res, taskToReview);
  } catch (err) {
    next(err);
  }
};

export default {
  createPractice,
  changePractice,
  deletePractice,
  submitPractice,
  getPreparedPractice,
  getFeedbacks,
  getTaskQueue,
  getTaskReview,
  submitFeedback,
  userFeedbacks,
};
