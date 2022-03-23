import { User } from '@models/user.model';
import DB from '@databases';
import { generateHash } from '@utils/sha256';
import { generateTokens, saveRefreshToken } from '@services/token.service';
import { deleteRefreshToken, findToken, validateRefreshToken } from '@services/token.service';
import { ControlledException } from '@utils/exceptions';
import { StatusCode } from '@interfaces/status.interface';
import { userAuthTransform } from '@transforms/user.transform';
import { findRoleByAccessLevel } from '@services/roles.service';

export const auth = async (login: string, password: string) => {
  const hashedPassword = generateHash(password);
  const user = await DB.manager.findOne(User, {
    where: [
      { password: hashedPassword, email: login },
      { password: hashedPassword, nickname: login },
    ],
    relations: { role: true },
  });
  if (!user) {
    throw new ControlledException('Invalid email or password', StatusCode.UNAUTHORIZED);
  }
  const tokens = generateTokens(user.id);
  await saveRefreshToken(user.id, tokens.refreshToken);
  return userAuthTransform(tokens, user, user.role);
};

export const signup = async (name: string, secondName: string, nickname: string, email: string, password: string) => {
  const hashedPassword = generateHash(password);
  const defaultRole = await findRoleByAccessLevel(0);
  const isUserExists = await DB.manager.findOneBy(User, [{ nickname }, { email }]);
  if (isUserExists) throw new ControlledException('An account with this email or nickname already exists.');
  const user = await DB.manager.save(User, {
    name,
    secondName,
    nickname,
    email,
    password: hashedPassword,
    roleId: defaultRole.id,
  });
  const tokens = generateTokens(user.id);
  await saveRefreshToken(user.id, tokens.refreshToken);
  return userAuthTransform(tokens, user, defaultRole);
};

export const logout = async (refreshToken: string) => {
  const deletedRefreshToken = await deleteRefreshToken(refreshToken);
  return deletedRefreshToken;
};

export const refresh = async (refreshToken: string) => {
  const userId = validateRefreshToken(refreshToken);
  const tokenFromDB = await findToken(refreshToken);
  if (!userId || !tokenFromDB) {
    throw new ControlledException('Incorrect token', StatusCode.UNAUTHORIZED);
  }
  const user = await DB.manager.findOne(User, { where: { id: userId }, relations: { role: true } });
  if (!user) {
    throw new ControlledException("User doesn't exists", StatusCode.UNAUTHORIZED);
  }
  const tokens = generateTokens(userId);
  await saveRefreshToken(userId, tokens.refreshToken);
  return userAuthTransform(tokens, user, user.role);
};
