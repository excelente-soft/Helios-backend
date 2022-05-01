import Joi from 'joi';

import { StatusCode } from '@interfaces/status.interface';

import ExceptionsUtility from './exceptions';

const nicknameRegExp = /^[A-Za-z0-9_]+$/;
const nicknameOrEmail = /^[A-Za-z0-9_.@]+$/;
const passwordRegExp = /^[A-Za-z0-9_!#$%@^&*(-)+=><"';:}\/?\\{\[\],]+$/;
const notSpaceRegExp = /^[^\s]+$/;
const notSpecialSymbol = /^[^!#$%^&*(-)+=><"';:}\/?\\{\[\],]+$/;

const Schemas = {
  SignupSchema: Joi.object({
    name: Joi.string().pattern(notSpecialSymbol).min(2).max(24).required(),
    secondName: Joi.string().pattern(notSpecialSymbol).min(2).max(24).required(),
    nickname: Joi.string().pattern(notSpecialSymbol).pattern(nicknameRegExp).min(2).max(24).required(),
    email: Joi.string().min(3).max(64).email().required(),
    password: Joi.string().pattern(notSpaceRegExp).pattern(passwordRegExp).min(6).max(36).required(),
  }),
  LoginSchema: Joi.object({
    login: Joi.string()
      .pattern(notSpaceRegExp)
      .pattern(notSpecialSymbol)
      .min(3)
      .max(64)
      .pattern(nicknameOrEmail)
      .required(),
    password: Joi.string().pattern(notSpaceRegExp).pattern(passwordRegExp).min(6).max(36).required(),
  }),
  AuthorizationSchema: Joi.object({
    authorization: Joi.string().min(35).required(),
  }),
  RefreshTokenSchema: Joi.object({
    refreshToken: Joi.string().min(35).required(),
  }),
  ChangeProfileSchema: Joi.object({
    name: Joi.string().pattern(notSpecialSymbol).min(2).max(24).required(),
    secondName: Joi.string().pattern(notSpecialSymbol).min(2).max(24).required(),
    nickname: Joi.string().pattern(notSpecialSymbol).pattern(nicknameRegExp).min(2).max(24).required(),
  }),
  ChangeEmailSchema: Joi.object({
    email: Joi.string().min(3).max(64).email().required(),
    password: Joi.string().pattern(notSpaceRegExp).pattern(passwordRegExp).min(6).max(36).required(),
  }),
  ChangePasswordSchema: Joi.object({
    currentPassword: Joi.string().pattern(notSpaceRegExp).pattern(passwordRegExp).min(6).max(36).required(),
    newPassword: Joi.string()
      .pattern(notSpaceRegExp)
      .pattern(passwordRegExp)
      .min(6)
      .max(36)
      .disallow(Joi.ref('currentPassword'))
      .required(),
  }),
  ChangeTypeSchema: Joi.object({
    type: Joi.string().valid('public', 'private').required(),
  }),
  ChangeAvatarSchema: Joi.object({
    avatar: Joi.string().required(),
  }),
  CreateRoleSchema: Joi.object({
    accessLevel: Joi.number().integer().min(0).max(10).required(),
    color: Joi.string().pattern(notSpaceRegExp).min(2).max(10).required(),
    roleName: Joi.string().min(2).max(24).required(),
  }),
  CreateCourseSchema: Joi.object({
    name: Joi.string().min(6).max(64).required(),
    shortDescription: Joi.string().min(6).max(64).required(),
    description: Joi.string().min(16).max(1024).required(),
    image: Joi.string().required(),
    price: Joi.number().min(0).max(100000).required(),
  }),
  CourseNameSchema: Joi.object({
    name: Joi.string().min(6).max(64).required(),
  }),
  CourseIdSchema: Joi.object({
    courseId: Joi.string().required(),
  }),
  ChangeCourseSchema: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().min(6).max(64).required(),
    shortDescription: Joi.string().min(6).max(64).required(),
    description: Joi.string().min(16).max(1024).required(),
    image: Joi.string().required(),
    price: Joi.number().min(0).max(100000).required(),
    targetAccessLevel: Joi.number().integer().min(0).max(10).required(),
  }),
  ChangeLectureSchema: Joi.object({
    id: Joi.string().required(),
    text: Joi.string().min(6).max(17280).required(),
    name: Joi.string().min(3).required(),
  }),
  IdSchema: Joi.object({
    id: Joi.string().required(),
  }),
  ChangeTestNameSchema: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().min(3).required(),
  }),
  testIdSchema: Joi.object({
    testId: Joi.string().required(),
  }),
  ChangeQuestSchema: Joi.object({
    id: Joi.string().required(),
    question: Joi.string().min(1).max(1024).required(),
  }),
  ChangeAnswerSchema: Joi.object({
    id: Joi.string().required(),
    answer: Joi.string().min(1).max(1024).required(),
    isCorrect: Joi.boolean().required(),
  }),
};

const validateBody = (data: unknown, schema: keyof typeof Schemas) => {
  const validatedData = Schemas[schema].validate(data);
  if (validatedData.error) {
    throw new ExceptionsUtility.ControlledException(validatedData.error.details[0].message, StatusCode.BAD_REQUEST);
  }
};

export default { validateBody };
