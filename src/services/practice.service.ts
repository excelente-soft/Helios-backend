import { DB } from '@databases';
import { IModal, ModalType } from '@interfaces/modal.interface';
import { ObjectiveType, TaskType } from '@interfaces/task.interface';
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
  await DB.manager.save(Queue, { link, practice: practice });
  await DB.manager.save(Grade, {
    taskId: practice.id,
    studentId: student.id,
    rating: 4,
    type: TaskType.practice,
  });
  return {
    message: `Practice ${practice.name} has been submitted and will be graded shortly, temporarily your rating is 4`,
    type: ModalType.Success,
  };
};

export default {
  createPractice,
  changePractice,
  deletePractice,
  submitPractice,
  getPreparedPractice,
};
