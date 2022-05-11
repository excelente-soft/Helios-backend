import { Student } from '../models/student.model';

import { ICourseManage, IUserCourse } from '@interfaces/course.interface';
import { ITask } from '@interfaces/task.interface';

const toTasks = (tasks: ITask[]) => {
  return tasks.map(({ id, name, position, courseId, type }) => ({ id, name, position, courseId, type }));
};

const toCourseManage = (courseToManage: ICourseManage) => {
  const {
    id,
    creationDate,
    name,
    shortDescription,
    description,
    image,
    price,
    targetAccessLevel,
    tests,
    lectures,
    practices,
  } = courseToManage;

  return {
    course: { id, name, creationDate, shortDescription, description, image, price, targetAccessLevel },
    tests: tests,
    lectures: lectures,
    practices: practices,
  };
};

const toUserCourses = (studentCourses: IUserCourse[]) => {
  return studentCourses.map((course) => {
    const { author, creationDate, description, id, image, name, price, shortDescription, targetAccessLevel, progress } =
      course;
    return { author, creationDate, description, id, image, name, price, shortDescription, targetAccessLevel, progress };
  });
};

const toCourseProgress = (studentCourses: Student) => {
  const { author, creationDate, description, id, image, name, price, shortDescription, targetAccessLevel } =
    studentCourses.course;
  return {
    course: { author, creationDate, description, id, image, name, price, shortDescription, targetAccessLevel },
    grades: studentCourses.grades,
    tests: toTasks(studentCourses.course.tests),
    lectures: toTasks(studentCourses.course.lectures),
    practices: toTasks(studentCourses.course.practices),
  };
};

export default {
  toCourseManage,
  toUserCourses,
  toCourseProgress,
};
