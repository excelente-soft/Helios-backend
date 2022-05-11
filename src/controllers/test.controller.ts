import { NextFunction, Request, Response } from 'express';

import { Services } from '@services';
import { Utils } from '@utils';

const createTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.body;
    Utils.Validator.validateBody({ courseId }, 'CourseIdSchema');
    const createTestResult = await Services.Test.createTest(courseId);
    return Utils.Sender.sendToClient(res, createTestResult);
  } catch (err) {
    next(err);
  }
};

const changeTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, name, time } = req.body;
    Utils.Validator.validateBody({ id, name, time }, 'ChangeTestSchema');
    const changeTestResult = await Services.Test.changeTest(id, name, time);
    return Utils.Sender.sendToClient(res, changeTestResult);
  } catch (err) {
    next(err);
  }
};

const deleteTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    Utils.Validator.validateBody({ id }, 'IdSchema');
    const deleteTestResult = await Services.Test.deleteTest(id);
    return Utils.Sender.sendToClient(res, deleteTestResult);
  } catch (err) {
    next(err);
  }
};

const submitTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, answers } = req.body;
    Utils.Validator.validateBody({ id }, 'IdSchema');
    const submitTestResult = await Services.Test.submitTest(id, answers, req.user || '');
    return Utils.Sender.sendToClient(res, submitTestResult);
  } catch (err) {
    next(err);
  }
};

const getPreparedTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    Utils.Validator.validateBody({ id }, 'IdSchema');
    const preparedTest = await Services.Test.getPreparedTest(id, req.user || '');
    return Utils.Sender.sendToClient(res, preparedTest);
  } catch (err) {
    next(err);
  }
};

const createQuest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { testId } = req.body;
    Utils.Validator.validateBody({ testId }, 'testIdSchema');
    const createQuestResult = await Services.Test.createQuest(testId);
    return Utils.Sender.sendToClient(res, createQuestResult);
  } catch (err) {
    next(err);
  }
};

const changeQuest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, question } = req.body;
    Utils.Validator.validateBody({ id, question }, 'ChangeQuestSchema');
    const changeQuestResult = await Services.Test.changeQuest(id, question);
    return Utils.Sender.sendToClient(res, changeQuestResult);
  } catch (err) {
    next(err);
  }
};

const deleteQuest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    Utils.Validator.validateBody({ id }, 'IdSchema');
    const deleteQuestResult = await Services.Test.deleteQuest(id);
    return Utils.Sender.sendToClient(res, deleteQuestResult);
  } catch (err) {
    next(err);
  }
};

const createAnswer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    Utils.Validator.validateBody({ id }, 'IdSchema');
    const createAnswerResult = await Services.Test.createAnswer(id);
    return Utils.Sender.sendToClient(res, createAnswerResult);
  } catch (err) {
    next(err);
  }
};

const changeAnswer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, answer, isCorrect } = req.body;
    Utils.Validator.validateBody({ id, answer, isCorrect }, 'ChangeAnswerSchema');
    const changeAnswerResult = await Services.Test.changeAnswer(id, answer, isCorrect);
    return Utils.Sender.sendToClient(res, changeAnswerResult);
  } catch (err) {
    next(err);
  }
};

const deleteAnswer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    Utils.Validator.validateBody({ id }, 'IdSchema');
    const deleteAnswerResult = await Services.Test.deleteAnswer(id);
    return Utils.Sender.sendToClient(res, deleteAnswerResult);
  } catch (err) {
    next(err);
  }
};

export default {
  createTest,
  changeTest,
  deleteTest,
  submitTest,
  getPreparedTest,
  createQuest,
  changeQuest,
  deleteQuest,
  createAnswer,
  changeAnswer,
  deleteAnswer,
};
