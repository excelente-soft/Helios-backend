import { ITask } from '../interfaces/task.interface';

import { LessThanOrEqual } from 'typeorm';

import { DB } from '@databases';
import { IChangeCourse, ICreateCourse, IUserCourse } from '@interfaces/course.interface';
import { IModal, ModalType } from '@interfaces/modal.interface';
import { StatusCode } from '@interfaces/status.interface';
import { Certificate } from '@models/certificate.model';
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
  await DB.manager.save(Course, {
    ...newCourseData,
    targetAccessLevel: userAccessLevel,
    image: imageUrl,
    author: creator.nickname,
  });
  return true;
};

const getAllCourses = async () => {
  const courses = await DB.manager.find(Course);
  return courses;
};

const getCoursePreview = async (courseName: string) => {
  const course = await DB.manager.findOne(Course, {
    where: { name: courseName },
    relations: ['tests', 'lectures', 'practices'],
  });
  if (!course) {
    throw new Utils.Exceptions.ControlledException('Course not found', StatusCode.NOT_FOUND);
  }
  return Transforms.Course.toCourseManage(course);
};

const registerToCourse = async (userId: string, courseName: string): Promise<IModal> => {
  const selectedCourse = await DB.manager.findOneByOrFail(Course, { name: courseName });
  const isRegistered = await DB.manager.findOneBy(Student, { userId, courseId: selectedCourse.id });
  if (isRegistered) {
    throw new Utils.Exceptions.ControlledException('You are already registered to this course', StatusCode.CONFLICT);
  }
  const user = await DB.manager.findOneByOrFail(User, { id: userId });
  await DB.manager.save(Student, { courseId: selectedCourse.id, userId: user.id });
  return { message: "You've successfully registered to this course", type: ModalType.SUCCESS };
};

const coursesToManage = (userAccessLevel: number) => {
  const courses = DB.manager.findBy(Course, { targetAccessLevel: LessThanOrEqual(userAccessLevel) });
  return courses;
};

const courseToManage = async (courseId: string, userAccessLevel: number) => {
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
  return Transforms.Course.toCourseManage(course);
};

const userCourses = async (userId: string) => {
  const rawStudentCourses = await DB.manager.find(Student, {
    where: { userId },
    relations: {
      course: {
        tests: true,
        lectures: true,
        practices: true,
      },
      grades: true,
      certificates: true,
    },
  });
  const studentCourses: IUserCourse[] = rawStudentCourses.map((student) => {
    const course = student.course as IUserCourse;
    const totalTasks: ITask[] = [...course.lectures, ...course.tests, ...course.practices];
    const totalCompletedTasks = totalTasks.filter((task) =>
      student.grades.find((grade) => grade.taskId === task.id && grade.rating >= 4),
    );
    course.progress = 0;
    course.certificates = student.certificates;
    if (totalCompletedTasks.length !== 0) {
      course.progress = +((totalCompletedTasks.length / totalTasks.length) * 100).toFixed(2);
    }
    return course;
  });

  return Transforms.Course.toUserCourses(studentCourses);
};

const changeCourse = async (courseId: string, newCourseData: IChangeCourse, userAccessLevel: number) => {
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

const courseProgress = async (courseName: string, userId: string) => {
  const targetCourse = await DB.manager.findOneByOrFail(Course, { name: courseName });
  const courseProgress = await DB.manager.findOneOrFail(Student, {
    where: { courseId: targetCourse.id, userId },
    relations: {
      course: {
        tests: true,
        lectures: true,
        practices: true,
      },
      grades: true,
    },
  });
  return Transforms.Course.toCourseProgress(courseProgress);
};

const getCertificate = async (courseId: string, userId: string): Promise<IModal> => {
  const targetCourse = await DB.manager.findOneByOrFail(Course, { id: courseId });
  const courseProgress = await DB.manager.findOneOrFail(Student, {
    where: { courseId: targetCourse.id, userId },
    relations: {
      course: {
        tests: true,
        lectures: true,
        practices: true,
      },
      grades: true,
      user: true,
    },
  });
  const totalHours =
    courseProgress.course.tests.length + courseProgress.course.lectures.length + courseProgress.course.practices.length;
  await DB.manager.save(Certificate, {
    name: courseProgress.user.name,
    secondName: courseProgress.user.secondName,
    courseName: targetCourse.name,
    hours: totalHours,
    studentId: courseProgress.id,
  });
  return { message: 'Certificate successfully generated', type: ModalType.SUCCESS };
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
  courseProgress,
  getCertificate,
};
