import { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_TIME, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_TIME } from '@config';
import { Token } from '@models/token.model';
import DB from '@databases';
import { sign, verify } from 'jsonwebtoken';
import { ITokenPayload } from '@interfaces/token.interface';

export const generateTokens = (id: string) => {
  const accessToken = sign({ id }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_TIME,
  });
  const refreshToken = sign({ id }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_TIME,
  });
  return { accessToken, refreshToken };
};

export const saveRefreshToken = async (userId: string, refreshToken: string) => {
  const existToken = await DB.manager.findOneBy(Token, { userId });
  if (existToken) {
    existToken.refreshToken = refreshToken;
    return await DB.manager.save(existToken);
  }
  const token = DB.manager.save(Token, { userId, refreshToken });
  return token;
};

export const deleteRefreshToken = async (refreshToken: string) => {
  await DB.manager.delete(Token, { refreshToken });
  return refreshToken;
};

export const validateAccessToken = (accessToken: string) => {
  try {
    const userData = verify(accessToken, ACCESS_TOKEN_SECRET) as ITokenPayload;
    return userData.id;
  } catch (err) {
    return null;
  }
};

export const validateRefreshToken = (refreshToken: string) => {
  try {
    const userData = verify(refreshToken, REFRESH_TOKEN_SECRET) as ITokenPayload;
    return userData.id;
  } catch (err) {
    return null;
  }
};

export const findToken = async (refreshToken: string) => {
  const tokenData = await DB.manager.findOneBy(Token, { refreshToken });
  return tokenData;
};
