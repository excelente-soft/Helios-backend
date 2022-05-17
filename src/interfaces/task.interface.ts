export interface ITask {
  id: string;
  name: string;
  position: number;
  courseId: string;
  type: TaskType;
}

export enum TaskType {
  LECTURE = 'lecture',
  TEST = 'test',
  PRACTICE = 'practice',
}

export enum ObjectiveType {
  NONE = 'none',
  FIGMA = 'figma',
  CODESANDBOX = 'codesandbox',
}

export interface IUserAnswer {
  questId: string;
  answersId: string[];
}

export interface IAnswerTree {
  [key: string]: IUserAnswer;
}
