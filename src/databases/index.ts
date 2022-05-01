import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from '@config';
import { Answer } from '@models/answer.model';
import { Course } from '@models/course.model';
import { Grade } from '@models/grade.model';
import { Lecture } from '@models/lecture.model';
import { Practice } from '@models/practice.model';
import { Quest } from '@models/quest.model';
import { Role } from '@models/role.model';
import { Student } from '@models/student.model';
import { Test } from '@models/test.model';
import { Token } from '@models/token.model';
import { User } from '@models/user.model';

export const DB = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [User, Token, Role, Student, Course, Lecture, Test, Quest, Answer, Grade, Practice],
  synchronize: true,
  logging: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
