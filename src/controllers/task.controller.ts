import { NextFunction, Request, Response } from 'express';

import { Services } from '@services';
import { Utils } from '@utils';

const changeLecture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, text, name } = req.body;
    Utils.Validator.validateBody({ id, text, name }, 'ChangeLectureSchema');
    const changeLectureResult = await Services.Task.changeLecture(id, text, name);
    return Utils.Sender.sendToClient(res, changeLectureResult);
  } catch (err) {
    next(err);
  }
};

const changePractice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, link, name, objective, objectiveType } = req.body;
    // Utils.Validator.validateBody({ id, text, name }, 'ChangeLectureSchema');
    const changeLectureResult = await Services.Task.changePractice(id, link, name, objective, objectiveType);
    return Utils.Sender.sendToClient(res, changeLectureResult);
  } catch (err) {
    next(err);
  }
};

const deleteLecture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    Utils.Validator.validateBody({ id }, 'IdSchema');
    const deleteLectureResult = await Services.Task.deleteLecture(id);
    return Utils.Sender.sendToClient(res, deleteLectureResult);
  } catch (err) {
    next(err);
  }
};

const deleteTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    Utils.Validator.validateBody({ id }, 'IdSchema');
    const deleteTestResult = await Services.Task.deleteTest(id);
    return Utils.Sender.sendToClient(res, deleteTestResult);
  } catch (err) {
    next(err);
  }
};

const deleteQuest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    Utils.Validator.validateBody({ id }, 'IdSchema');
    const deleteQuestResult = await Services.Task.deleteQuest(id);
    return Utils.Sender.sendToClient(res, deleteQuestResult);
  } catch (err) {
    next(err);
  }
};

const createLecture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.body;
    Utils.Validator.validateBody({ courseId }, 'CourseIdSchema');
    const createLectureResult = await Services.Task.createLecture(courseId);
    return Utils.Sender.sendToClient(res, createLectureResult);
  } catch (err) {
    next(err);
  }
};

const createQuest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { testId } = req.body;
    Utils.Validator.validateBody({ testId }, 'testIdSchema');
    const createQuestionResult = await Services.Task.createQuestion(testId);
    return Utils.Sender.sendToClient(res, createQuestionResult);
  } catch (err) {
    next(err);
  }
};

const createTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.body;
    Utils.Validator.validateBody({ courseId }, 'CourseIdSchema');
    const createTestResult = await Services.Task.createTest(courseId);
    return Utils.Sender.sendToClient(res, createTestResult);
  } catch (err) {
    next(err);
  }
};

const createPractice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.body;
    Utils.Validator.validateBody({ courseId }, 'CourseIdSchema');
    const createPracticeResult = await Services.Task.createPractice(courseId);
    return Utils.Sender.sendToClient(res, createPracticeResult);
  } catch (err) {
    next(err);
  }
};

const changeOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const array = req.body;
    const changeOrderResult = await Services.Task.changeTaskOrder(array);
    return Utils.Sender.sendToClient(res, changeOrderResult);
  } catch (err) {
    next(err);
  }
};

const changeTestName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, name } = req.body;
    Utils.Validator.validateBody({ id, name }, 'ChangeTestNameSchema');
    const changeTestNameResult = await Services.Task.changeTestName(id, name);
    return Utils.Sender.sendToClient(res, changeTestNameResult);
  } catch (err) {
    next(err);
  }
};

const changeQuest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, question } = req.body;
    Utils.Validator.validateBody({ id, question }, 'ChangeQuestSchema');
    const changeQuestResult = await Services.Task.changeQuestion(id, question);
    return Utils.Sender.sendToClient(res, changeQuestResult);
  } catch (err) {
    next(err);
  }
};

const changeAnswer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, answer, isCorrect } = req.body;
    Utils.Validator.validateBody({ id, answer, isCorrect }, 'ChangeAnswerSchema');
    const changeAnswerResult = await Services.Task.changeAnswer(id, answer, isCorrect);
    return Utils.Sender.sendToClient(res, changeAnswerResult);
  } catch (err) {
    next(err);
  }
};

const deleteAnswer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    Utils.Validator.validateBody({ id }, 'IdSchema');
    const deleteAnswerResult = await Services.Task.deleteAnswer(id);
    return Utils.Sender.sendToClient(res, deleteAnswerResult);
  } catch (err) {
    next(err);
  }
};

const createAnswer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    Utils.Validator.validateBody({ id }, 'IdSchema');
    const createAnswerResult = await Services.Task.createAnswer(id);
    return Utils.Sender.sendToClient(res, createAnswerResult);
  } catch (err) {
    next(err);
  }
};

const deletePractice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    Utils.Validator.validateBody({ id }, 'IdSchema');
    const deletePracticeResult = await Services.Task.deletePractice(id);
    return Utils.Sender.sendToClient(res, deletePracticeResult);
  } catch (err) {
    next(err);
  }
};

export default {
  changeLecture,
  deleteLecture,
  deleteTest,
  deleteQuest,
  createLecture,
  createQuest,
  createTest,
  changeOrder,
  changeTestName,
  changeQuest,
  changeAnswer,
  deleteAnswer,
  createAnswer,
  createPractice,
  deletePractice,
  changePractice,
};
