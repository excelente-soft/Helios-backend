export interface ITask {
  id: string;
  name: string;
  position: number;
  courseId: string;
  type: 'lecture' | 'test';
}
