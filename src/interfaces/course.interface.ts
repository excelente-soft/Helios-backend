import { Course } from '../models/course.model';

import { Timestamp } from 'typeorm';

import { Lecture } from '@models/lecture.model';
import { Practice } from '@models/practice.model';
import { Test } from '@models/test.model';

export interface ICreateCourse {
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  price: number;
}

export interface IChangeCourse extends ICreateCourse {
  targetAccessLevel: number;
}

export interface ICourseManage extends IChangeCourse {
  id: string;
  creationDate: Timestamp;
  tests: Test[];
  lectures: Lecture[];
  practices: Practice[];
}

export interface IUserCourse extends Course {
  progress: number;
}
