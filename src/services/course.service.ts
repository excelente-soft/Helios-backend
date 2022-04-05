import DB from '@databases';
import { ControlledException } from '@utils/exceptions';
import { ICreateCourse } from '../interfaces/course.interface';
import { StatusCode } from '../interfaces/status.interface';
import { Course } from '../models/course.model';
import { User } from '../models/user.model';

export const createCourse = async (id: string, newCourseData: ICreateCourse) => {
  const creator = await DB.manager.findOneBy(User, { id });
  if (!creator) {
    throw new ControlledException('User not found', StatusCode.NOT_FOUND);
  }
  const course = await DB.manager.save(Course, { ...newCourseData, author: creator.nickname });
  return course;
};
