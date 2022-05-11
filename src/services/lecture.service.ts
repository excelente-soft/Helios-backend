import { DB } from '@databases';
import { TaskType } from '@interfaces/task.interface';
import { Grade } from '@models/grade.model';
import { Lecture } from '@models/lecture.model';
import { Student } from '@models/student.model';
import { Services } from '@services';
import { Utils } from '@utils';

const changeLecture = async (id: string, text: string, name: string) => {
  const changedLectureResult = await DB.createQueryBuilder()
    .update(Lecture)
    .set({ text, name })
    .where({ id })
    .returning('*')
    .execute();
  return changedLectureResult.raw[0];
};

const deleteLecture = async (id: string) => {
  await DB.manager.delete(Lecture, { id });
  await Services.Task.deleteGrade(id);
  return true;
};

const createLecture = async (courseId: string) => {
  const maxPosition = await Services.Task.getMaxPosition(courseId);
  const createLectureResult = await DB.manager.save(Lecture, {
    name: 'new lecture',
    text: 'new lecture',
    courseId,
    position: maxPosition + 1,
  });
  return createLectureResult;
};

const readLecture = async (id: string, userId: string) => {
  const lecture = await DB.manager.findOneByOrFail(Lecture, { id });
  const student = await DB.manager.findOneBy(Student, { userId, courseId: lecture.courseId });
  if (!student) {
    throw new Utils.Exceptions.ControlledException('You can not read this lecture');
  }

  return lecture;
};

const submitLecture = async (id: string, userId: string) => {
  const lecture = await DB.manager.findOneByOrFail(Lecture, { id });
  const student = await DB.manager.findOneBy(Student, { userId, courseId: lecture.courseId });
  if (!student) {
    throw new Utils.Exceptions.ControlledException('You can not read this lecture');
  }
  const hasLectureGrade = await DB.manager.findOneBy(Grade, { taskId: id, studentId: student.id });
  if (!hasLectureGrade) {
    await DB.manager.save(Grade, { taskId: id, studentId: student.id, rating: 4, type: TaskType.lecture });
  }
  return true;
};

export default {
  changeLecture,
  deleteLecture,
  createLecture,
  readLecture,
  submitLecture,
};
