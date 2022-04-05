import { auth, refresh, signup } from '@services/user.service';
import { validateBody } from '@utils/joiSchamas';
import { sendToClient } from '@utils/sender';
import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '@interfaces/status.interface';
import { validateAccessToken } from '@services/token.service';
import { ControlledException } from '@utils/exceptions';
import { createCourse } from '../services/course.service';

export const CreateCourseController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, shortDescription, description, image, price } = req.body;
    // validateBody({ login, password }, 'LoginSchema');
    const authResult = await createCourse(req.user || '', { name, shortDescription, description, image, price });
    return sendToClient(res, authResult);
  } catch (err) {
    next(err);
  }
};
