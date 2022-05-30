import { In, MoreThanOrEqual } from 'typeorm';

import { DB } from '@databases';
import { IModal, ModalType } from '@interfaces/modal.interface';
import { ObjectiveType, TaskType } from '@interfaces/task.interface';
import { Feedback } from '@models/feedback.model';
import { Grade } from '@models/grade.model';
import { Practice } from '@models/practice.model';
import { Queue } from '@models/queue';
import { Student } from '@models/student.model';
import { Services } from '@services';
import { Utils } from '@utils';

const createPractice = async (courseId: string) => {
  const maxPosition = await Services.Task.getMaxPosition(courseId);
  const createPracticeResult = await DB.manager.save(Practice, {
    name: 'new practice',
    objective: 'Objective list: 1, 2, 3',
    link: '',
    courseId,
    position: maxPosition + 1,
  });
  return createPracticeResult;
};

const changePractice = async (
  id: string,
  link: string,
  name: string,
  objective: string,
  objectiveType: ObjectiveType,
) => {
  const changePracticeResult = await DB.createQueryBuilder()
    .update(Practice)
    .set({ link, name, objective, objectiveType })
    .where({ id })
    .returning('*')
    .execute();
  return changePracticeResult.raw[0];
};

const deletePractice = async (id: string) => {
  await DB.manager.delete(Practice, { id });
  await Services.Task.deleteGrade(id);
  return true;
};

const getPreparedPractice = async (id: string, userId: string) => {
  const targetPractice = await DB.manager.findOneByOrFail(Practice, { id });
  const student = await DB.manager.findOneBy(Student, { userId, courseId: targetPractice.courseId });
  if (!student) {
    throw new Utils.Exceptions.ControlledException('You can not perform this practice');
  }
  return targetPractice;
};

const submitPractice = async (practiceId: string, link: string, userId: string): Promise<IModal> => {
  const practice = await DB.manager.findOneByOrFail(Practice, { id: practiceId });
  const student = await DB.manager.findOneBy(Student, { userId, courseId: practice.courseId });
  if (!student) {
    throw new Utils.Exceptions.ControlledException('You can not complete this practice');
  }
  const grade = await DB.manager.save(Grade, {
    taskId: practice.id,
    studentId: student.id,
    rating: 4,
    type: TaskType.PRACTICE,
  });
  await DB.manager.save(Queue, { link, practice: practice, grade: grade });
  return {
    message: `Practice ${practice.name} has been submitted and will be graded shortly, temporarily your rating is 4`,
    type: ModalType.SUCCESS,
  };
};

const getFeedbacks = async () => {
  const feedbacks = await DB.manager.find(Feedback, {
    where: {
      createdAt: MoreThanOrEqual(new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)),
    },
    order: {
      createdAt: 'DESC',
    },
    take: 7,
  });
  return feedbacks.reverse();
};

const getTaskQueue = async () => {
  const taskQueue = await DB.manager.find(Queue, {
    order: {
      position: 'DESC',
    },
    relations: ['practice'],
  });
  return taskQueue;
};

const getTaskReview = async (taskId: string) => {
  const taskQueue = await DB.manager.findOne(Queue, {
    where: {
      id: taskId,
    },
    relations: ['practice'],
  });
  return taskQueue;
};

const submitFeedback = async (queueId: string, review: string, rating: number) => {
  const queueTask = await DB.manager.findOne(Queue, {
    where: { id: queueId },
    relations: ['practice', 'grade'],
  });
  if (!queueTask) {
    throw new Utils.Exceptions.ControlledException('Task not found Or somebody is already reviewing this task');
  }
  await DB.manager.save(Feedback, {
    review,
    rating,
    practice: queueTask.practice,
    grade: queueTask.grade,
  });
  await DB.createQueryBuilder()
    .update(Grade)
    .set({ rating })
    .where({ id: queueTask.grade.id })
    .returning('*')
    .execute();
  await DB.manager.delete(Queue, { id: queueId });
  return true;
};

const userFeedbacks = async (courseId: string, practiceId: string, userId: string) => {
  const student = await DB.manager.findOneOrFail(Student, { where: { userId, courseId }, relations: ['grades'] });
  const gradesIds = student.grades.map((grade) => grade.id);
  const feedbacks = await DB.manager.findBy(Feedback, { gradeId: In(gradesIds), practiceId });
  return feedbacks;
};

export default {
  createPractice,
  changePractice,
  deletePractice,
  submitPractice,
  getPreparedPractice,
  getFeedbacks,
  getTaskQueue,
  getTaskReview,
  submitFeedback,
  userFeedbacks,
};
