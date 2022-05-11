import { NextFunction, Request, Response } from 'express';

import { Services } from '@services';
import { Utils } from '@utils';

const createLecture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.body;
    Utils.Validator.validateBody({ courseId }, 'CourseIdSchema');
    const createLectureResult = await Services.Lecture.createLecture(courseId);
    return Utils.Sender.sendToClient(res, createLectureResult);
  } catch (err) {
    next(err);
  }
};

const readLecture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    Utils.Validator.validateBody({ id }, 'IdSchema');
    const lecture = await Services.Lecture.readLecture(id, req.user || '');
    return Utils.Sender.sendToClient(res, lecture);
  } catch (err) {
    next(err);
  }
};

const deleteLecture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    Utils.Validator.validateBody({ id }, 'IdSchema');
    const deleteLectureResult = await Services.Lecture.deleteLecture(id);
    return Utils.Sender.sendToClient(res, deleteLectureResult);
  } catch (err) {
    next(err);
  }
};

const changeLecture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, text, name } = req.body;
    Utils.Validator.validateBody({ id, text, name }, 'ChangeLectureSchema');
    const changeLectureResult = await Services.Lecture.changeLecture(id, text, name);
    return Utils.Sender.sendToClient(res, changeLectureResult);
  } catch (err) {
    next(err);
  }
};

const submitLecture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    Utils.Validator.validateBody({ id }, 'IdSchema');
    const submitLectureResult = await Services.Lecture.submitLecture(id, req.user || '');
    return Utils.Sender.sendToClient(res, submitLectureResult);
  } catch (err) {
    next(err);
  }
};

export default {
  createLecture,
  readLecture,
  deleteLecture,
  changeLecture,
  submitLecture,
};
