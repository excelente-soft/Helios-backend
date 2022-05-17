import { DB } from '@databases';
import { ITask, TaskType } from '@interfaces/task.interface';
import { Grade } from '@models/grade.model';
import { Lecture } from '@models/lecture.model';
import { Practice } from '@models/practice.model';
import { Test } from '@models/test.model';

const getMaxPosition = async (courseId: string) => {
  const allLectures = await DB.manager.findAndCountBy(Lecture, { courseId });
  const allTests = await DB.manager.findAndCountBy(Test, { courseId });
  const allPractices = await DB.manager.findAndCountBy(Practice, { courseId });
  const maxPosition = allLectures[1] + allTests[1] + allPractices[1];
  return maxPosition;
};

const changeTaskOrder = (tasks: ITask[]) => {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const newPosition = i + 1;
    const taskClass = task.type === TaskType.LECTURE ? Lecture : task.type === TaskType.TEST ? Test : Practice;
    DB.createQueryBuilder().update(taskClass).set({ position: newPosition }).where({ id: task.id }).execute();
  }
  return true;
};

const deleteGrade = async (taskId: string) => {
  await DB.manager.delete(Grade, { taskId });
  return true;
};

export default {
  getMaxPosition,
  deleteGrade,
  changeTaskOrder,
};
