import { ICourseManage } from '@interfaces/course.interface';

const courseManage = (courseToManage: ICourseManage) => {
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

export default {
  courseManage,
};
