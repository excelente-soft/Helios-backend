import Joi from 'joi';
import { ControlledException } from '@utils/exceptions';
import { StatusCode } from '@interfaces/status.interface';

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
};

export const validateBody = (data: unknown, schema: keyof typeof Schemas) => {
  const validatedData = Schemas[schema].validate(data);
  if (validatedData.error) {
    throw new ControlledException(validatedData.error.details[0].message, StatusCode.BAD_REQUEST);
  }
};
