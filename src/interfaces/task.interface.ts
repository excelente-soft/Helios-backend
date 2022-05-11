export interface ITask {
  id: string;
  name: string;
  position: number;
  courseId: string;
  type: TaskType;
}

export enum TaskType {
  lecture = 'lecture',
  test = 'test',
  practice = 'practice',
}

export enum ObjectiveType {
  none = 'none',
  figma = 'figma',
  codesandbox = 'codesandbox',
}

export interface IUserAnswer {
  questId: string;
  answersId: string[];
}

export interface IAnswerTree {
  [key: string]: IUserAnswer;
}
