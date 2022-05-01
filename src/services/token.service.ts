import { sign, verify } from 'jsonwebtoken';

import { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_TIME, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_TIME } from '@config';
import { DB } from '@databases';
import { ITokenPayload } from '@interfaces/token.interface';
import { Token } from '@models/token.model';

const generateTokensById = (id: string) => {
  const accessToken = sign({ id }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_TIME,
  });
  const refreshToken = sign({ id }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_TIME,
  });
  return { accessToken, refreshToken };
};

const saveRefreshToken = async (userId: string, refreshToken: string) => {
  const existToken = await DB.manager.findOneBy(Token, { userId });
  if (existToken) {
    existToken.refreshToken = refreshToken;
    return await DB.manager.save(existToken);
  }
  const token = DB.manager.save(Token, { userId, refreshToken });
  return token;
};

const validateAccessToken = (accessToken: string) => {
  try {
    const userData = verify(accessToken, ACCESS_TOKEN_SECRET) as ITokenPayload;
    return userData.id;
  } catch (err) {
    return null;
  }
};

const validateRefreshToken = (refreshToken: string) => {
  try {
    const userData = verify(refreshToken, REFRESH_TOKEN_SECRET) as ITokenPayload;
    return userData.id;
  } catch (err) {
    return null;
  }
};

const findToken = async (refreshToken: string) => {
  const tokenData = await DB.manager.findOneBy(Token, { refreshToken });
  return tokenData;
};

export default {
  generateTokensById,
  saveRefreshToken,
  validateAccessToken,
  validateRefreshToken,
  findToken,
};
