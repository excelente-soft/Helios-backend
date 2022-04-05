import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from '@config';
import { DataSource } from 'typeorm';
import { User } from '@models/user.model';
import { Token } from '@models/token.model';
import { Role } from '@models/role.model';
import { Student } from '@models/student.model';
import { Course } from '@models/course.model';
import { Lecture } from '@models/lecture.model';
import { Quest } from '@models/quest.model';
import { Test } from '@models/test.model';
import { Answer } from '@models/answer.model';
import { Grade } from '@models/grade.model';

import 'reflect-metadata';

export default new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [User, Token, Role, Student, Course, Lecture, Test, Quest, Answer, Grade],
  synchronize: true,
  logging: false,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
