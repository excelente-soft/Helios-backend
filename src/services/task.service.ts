import { Practice } from '../models/practice.model';

import { DB } from '@databases';
import { ITask } from '@interfaces/task.interface';
import { Answer } from '@models/answer.model';
import { Lecture } from '@models/lecture.model';
import { Quest } from '@models/quest.model';
import { Test } from '@models/test.model';

const getMaxPosition = async (courseId: string) => {
  const allLectures = await DB.manager.findAndCountBy(Lecture, { courseId });
  const allTests = await DB.manager.findAndCountBy(Test, { courseId });
  const allPractices = await DB.manager.findAndCountBy(Practice, { courseId });
  const maxPosition = allLectures[1] + allTests[1] + allPractices[1];
  return maxPosition;
};

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
  return true;
};

const deleteTest = async (id: string) => {
  await DB.manager.delete(Test, { id });
  return true;
};

const createLecture = async (courseId: string) => {
  const maxPosition = await getMaxPosition(courseId);
  const createLectureResult = await DB.manager.save(Lecture, {
    name: 'new lecture',
    text: 'new lecture',
    courseId,
    position: maxPosition + 1,
  });
  return createLectureResult;
};

const createTest = async (courseId: string) => {
  const maxPosition = await getMaxPosition(courseId);
  const createTestResult = await DB.manager.save(Test, {
    name: 'new test',
    courseId,
    position: maxPosition + 1,
  });
  return createTestResult;
};

const changeTaskOrder = async (tasks: ITask[]) => {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.type === 'lecture') {
      await DB.createQueryBuilder().update(Lecture).set({ position: i }).where({ id: task.id }).execute();
    } else if (task.type === 'test') {
      await DB.createQueryBuilder().update(Test).set({ position: i }).where({ id: task.id }).execute();
    }
  }
};

const changeTestName = async (id: string, name: string) => {
  const changedTestResult = await DB.createQueryBuilder()
    .update(Test)
    .set({ name })
    .where({ id })
    .returning('*')
    .execute();
  return changedTestResult.raw[0];
};

const changeQuestion = async (id: string, question: string) => {
  const changedQuestResult = await DB.createQueryBuilder()
    .update(Quest)
    .set({ question })
    .where({ id })
    .returning('*')
    .execute();
  return changedQuestResult.raw[0];
};

const createQuestion = async (testId: string) => {
  const createQuestionResult = await DB.manager.save(Quest, { testId, question: 'new question' });
  return createQuestionResult;
};

const deleteQuest = async (id: string) => {
  await DB.manager.delete(Quest, { id });
  return true;
};

const deleteAnswer = async (id: string) => {
  await DB.manager.delete(Answer, { id });
  return true;
};

const changeAnswer = async (id: string, answerText: string, isCorrect: boolean) => {
  const changedAnswerResult = await DB.createQueryBuilder()
    .update(Answer)
    .set({ answer: answerText, isCorrect })
    .where({ id })
    .returning('*')
    .execute();
  return changedAnswerResult.raw[0];
};

const createAnswer = async (questId: string) => {
  const createAnswerResult = await DB.manager.save(Answer, {
    questId,
    answer: 'new answer',
    isCorrect: false,
  });
  return createAnswerResult;
};

const createPractice = async (courseId: string) => {
  const maxPosition = await getMaxPosition(courseId);
  const createLectureResult = await DB.manager.save(Practice, {
    name: 'new practice',
    objective: 'Objective list: 1, 2, 3',
    link: '',
    courseId,
    position: maxPosition + 1,
  });
  return createLectureResult;
};

const deletePractice = async (id: string) => {
  await DB.manager.delete(Practice, { id });
  return true;
};

const changePractice = async (id: string, link: string, name: string, objective: string, objectiveType: string) => {
  const changePracticeResult = await DB.createQueryBuilder()
    .update(Practice)
    .set({ link, name, objective, objectiveType })
    .where({ id })
    .returning('*')
    .execute();
  return changePracticeResult.raw[0];
};

export default {
  changeLecture,
  deleteLecture,
  createLecture,
  changeTaskOrder,
  createTest,
  changeTestName,
  deleteTest,
  createQuestion,
  deleteQuest,
  changeQuestion,
  deleteAnswer,
  changeAnswer,
  createAnswer,
  createPractice,
  deletePractice,
  changePractice,
};
