import { NextFunction, Request, Response } from 'express';

import { Services } from '@services';
import { Utils } from '@utils';

const createCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, shortDescription, description, image, price } = req.body;
    Utils.Validator.validateBody({ name, shortDescription, description, image, price }, 'CreateCourseSchema');
    const validatedData = { name, shortDescription, description, image, price };
    const createCourseResult = await Services.Course.createCourse(req.user || '', req.accessLevel || 0, validatedData);
    return Utils.Sender.sendToClient(res, createCourseResult);
  } catch (err) {
    next(err);
  }
};

const courses = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const coursesData = await Services.Course.getAllCourses();
    return Utils.Sender.sendToClient(res, coursesData);
  } catch (err) {
    next(err);
  }
};

const coursePreview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.params;
    Utils.Validator.validateBody({ name }, 'CourseNameSchema');
    const courseData = await Services.Course.getCoursePreview(name);
    return Utils.Sender.sendToClient(res, courseData);
  } catch (err) {
    next(err);
  }
};

const registerToCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    Utils.Validator.validateBody({ name }, 'CourseNameSchema');
    const registerResult = await Services.Course.registerToCourse(req.user || '', name);
    return Utils.Sender.sendToClient(res, registerResult);
  } catch (err) {
    next(err);
  }
};

const userCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const coursesData = await Services.Course.userCourses(req.user || '');
    return Utils.Sender.sendToClient(res, coursesData);
  } catch (err) {
    next(err);
  }
};

const coursesToManage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const coursesData = await Services.Course.coursesToManage(req.accessLevel || 0);
    return Utils.Sender.sendToClient(res, coursesData);
  } catch (err) {
    next(err);
  }
};

export const courseToManage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.params;
    Utils.Validator.validateBody({ courseId }, 'CourseIdSchema');
    const courseData = await Services.Course.courseToManage(courseId, req.accessLevel || 0);
    return Utils.Sender.sendToClient(res, courseData);
  } catch (err) {
    next(err);
  }
};

const changeCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, id } = req.body;
    const { name, price, shortDescription, description, image, targetAccessLevel } = data;
    Utils.Validator.validateBody(
      { name, price, shortDescription, description, image, targetAccessLevel, id },
      'ChangeCourseSchema',
    );
    const validatedData = { name, price, shortDescription, description, image, targetAccessLevel };
    const changeResult = await Services.Course.changeCourse(id, validatedData, req.accessLevel || 0);
    return Utils.Sender.sendToClient(res, changeResult);
  } catch (err) {
    next(err);
  }
};

export default {
  createCourse,
  courses,
  coursePreview,
  registerToCourse,
  userCourses,
  coursesToManage,
  courseToManage,
  changeCourse,
};
