import { DB } from '@databases';
import { IModal, ModalType } from '@interfaces/modal.interface';
import { IAnswerTree, IUserAnswer, TaskType } from '@interfaces/task.interface';
import { Answer } from '@models/answer.model';
import { Grade } from '@models/grade.model';
import { Quest } from '@models/quest.model';
import { Student } from '@models/student.model';
import { Test } from '@models/test.model';
import { Services } from '@services';
import { Transforms } from '@transforms';
import { Utils } from '@utils';

const createTest = async (courseId: string) => {
  const maxPosition = await Services.Task.getMaxPosition(courseId);
  const createTestResult = await DB.manager.save(Test, {
    name: 'new test',
    time: 1800,
    courseId,
    position: maxPosition + 1,
  });
  return createTestResult;
};

const changeTest = async (id: string, name: string, time: number) => {
  const changeTestResult = await DB.createQueryBuilder()
    .update(Test)
    .set({ name, time })
    .where({ id })
    .returning('*')
    .execute();
  return changeTestResult.raw[0];
};

const deleteTest = async (id: string) => {
  await DB.manager.delete(Test, { id });
  await Services.Task.deleteGrade(id);
  return true;
};

const getPreparedTest = async (testId: string, userId: string) => {
  const test = await DB.manager.findOneOrFail(Test, {
    where: { id: testId },
    relations: {
      quests: {
        answers: true,
      },
    },
  });
  const student = await DB.manager.findOneBy(Student, { userId, courseId: test.courseId });
  if (!student) {
    throw new Utils.Exceptions.ControlledException('You can not perform this test');
  }
  return Transforms.Task.toPassingTest(test);
};

const submitTest = async (testId: string, answers: IUserAnswer[], userId: string): Promise<IModal> => {
  const test = await DB.manager.findOneOrFail(Test, {
    where: { id: testId },
    relations: {
      quests: {
        answers: true,
      },
    },
  });
  const student = await DB.manager.findOneBy(Student, { userId, courseId: test.courseId });
  if (!student) {
    throw new Utils.Exceptions.ControlledException('You can not complete this test');
  }
  const answersTree: IAnswerTree = answers.reduce((tree, answ) => ({ ...tree, [answ.questId]: answ }), {});
  const totalCorrectQuests = test.quests.filter((quest) => {
    const userQuest = answersTree[quest.id];
    const correctAnswers = quest.answers.filter((answ) => answ.isCorrect);
    if (correctAnswers.length !== userQuest.answersId.length) {
      return false;
    }
    return correctAnswers.every((answer) => userQuest.answersId.includes(answer.id));
  }).length;
  const rating = Math.round((totalCorrectQuests / test.quests.length) * 10);
  await DB.manager.save(Grade, {
    taskId: test.id,
    studentId: student.id,
    rating,
    type: TaskType.test,
  });
  return {
    message: `Test completed your rating is: ${rating}`,
    type: rating >= 4 ? ModalType.Success : ModalType.Error,
  };
};

const createQuest = async (testId: string) => {
  const createQuestResult = await DB.manager.save(Quest, { testId, question: 'new question' });
  return createQuestResult;
};

const changeQuest = async (id: string, question: string) => {
  const changedQuestResult = await DB.createQueryBuilder()
    .update(Quest)
    .set({ question })
    .where({ id })
    .returning('*')
    .execute();
  return changedQuestResult.raw[0];
};

const deleteQuest = async (id: string) => {
  await DB.manager.delete(Quest, { id });
  return true;
};

const createAnswer = async (questId: string) => {
  const createAnswerResult = await DB.manager.save(Answer, {
    questId,
    answer: 'new answer',
    isCorrect: false,
  });
  return createAnswerResult;
};

const changeAnswer = async (id: string, answerText: string, isCorrect: boolean) => {
  const changeAnswerResult = await DB.createQueryBuilder()
    .update(Answer)
    .set({ answer: answerText, isCorrect })
    .where({ id })
    .returning('*')
    .execute();
  return changeAnswerResult.raw[0];
};

const deleteAnswer = async (id: string) => {
  await DB.manager.delete(Answer, { id });
  return true;
};

export default {
  createTest,
  changeTest,
  deleteTest,
  getPreparedTest,
  submitTest,
  createQuest,
  changeQuest,
  deleteQuest,
  createAnswer,
  changeAnswer,
  deleteAnswer,
};
