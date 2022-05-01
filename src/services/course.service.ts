import { LessThanOrEqual } from 'typeorm';

import { DB } from '@databases';
import { IChangeCourse, ICreateCourse } from '@interfaces/course.interface';
import { IModal } from '@interfaces/modal.interface';
import { StatusCode } from '@interfaces/status.interface';
import { Course } from '@models/course.model';
import { Student } from '@models/student.model';
import { User } from '@models/user.model';
import { Transforms } from '@transforms';
import { Utils } from '@utils';

import CloudinaryService from './cloudinary.service';

const createCourse = async (userId: string, userAccessLevel: number, newCourseData: ICreateCourse) => {
  if (userAccessLevel < 2) {
    throw new Utils.Exceptions.ControlledException('You are not allowed to create courses', StatusCode.FORBIDDEN);
  }
  const creator = await DB.manager.findOneByOrFail(User, { id: userId });
  let imageUrl = '';
  if (newCourseData.image !== 'empty') {
    const uploadedImage = await CloudinaryService.uploadImage(newCourseData.image);
    imageUrl = uploadedImage.secure_url;
  }
  const existingCourse = await DB.manager.findOneBy(Course, { name: newCourseData.name });
  if (existingCourse) {
    throw new Utils.Exceptions.ControlledException('Course with this name already exists', StatusCode.CONFLICT);
  }
  const course = await DB.manager.save(Course, {
    ...newCourseData,
    targetAccessLevel: userAccessLevel,
    image: imageUrl,
    author: creator.nickname,
  });
  return course;
};

const getAllCourses = async () => {
  const courses = await DB.manager.find(Course);
  return courses;
};

const getCoursePreview = async (courseName: string) => {
  const course = await DB.manager.findOneBy(Course, { name: courseName });
  if (!course) {
    throw new Utils.Exceptions.ControlledException('Course not found', StatusCode.NOT_FOUND);
  }
  return course;
};

const registerToCourse = async (userId: string, courseName: string): Promise<IModal> => {
  const selectedCourse = await DB.manager.findOneByOrFail(Course, { name: courseName });
  const isRegistered = await DB.manager.findOneBy(Student, { userId, courseId: selectedCourse.id });
  if (isRegistered) {
    throw new Utils.Exceptions.ControlledException('You are already registered to this course', StatusCode.CONFLICT);
  }
  const user = await DB.manager.findOneByOrFail(User, { id: userId });
  await DB.manager.save(Student, { courseId: selectedCourse.id, userId: user.id });
  return { message: "You've successfully registered to this course", type: 'Success' };
};

export const coursesToManage = (userAccessLevel: number) => {
  const courses = DB.manager.findBy(Course, { targetAccessLevel: LessThanOrEqual(userAccessLevel) });
  return courses;
};

export const courseToManage = async (courseId: string, userAccessLevel: number) => {
  const course = await DB.manager.findOneOrFail(Course, {
    where: { id: courseId, targetAccessLevel: LessThanOrEqual(userAccessLevel) },
    relations: {
      lectures: true,
      tests: {
        quests: {
          answers: true,
        },
      },
      practices: true,
    },
  });
  return Transforms.Course.courseManage(course);
};

export const userCourses = async (userId: string) => {
  const courses = DB.manager.find(Student, { where: { userId }, relations: ['course'] });
  return courses;
};

export const changeCourse = async (courseId: string, newCourseData: IChangeCourse, userAccessLevel: number) => {
  const course = await DB.manager.findOneByOrFail(Course, {
    id: courseId,
    targetAccessLevel: LessThanOrEqual(userAccessLevel),
  });
  let imageUrl = course.image;
  if (newCourseData.image !== 'old' && newCourseData.image !== 'empty' && newCourseData.image !== course.image) {
    const uploadedImage = await CloudinaryService.uploadImage(newCourseData.image);
    imageUrl = uploadedImage.secure_url;
  } else if (newCourseData.image === 'empty') {
    imageUrl = '';
  }
  const changedCourse = await DB.createQueryBuilder()
    .update(Course)
    .set({ ...newCourseData, image: imageUrl })
    .where({ id: courseId })
    .returning('*')
    .execute();
  return changedCourse.raw[0];
};

export default {
  createCourse,
  getAllCourses,
  getCoursePreview,
  registerToCourse,
  userCourses,
  coursesToManage,
  courseToManage,
  changeCourse,
};
