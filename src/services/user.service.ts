import { User } from '@models/user.model';
import DB from '@databases';
import { generateHash } from '@utils/sha256';
import { generateTokens, saveRefreshToken } from '@services/token.service';
import { findToken, validateRefreshToken } from '@services/token.service';
import { ControlledException } from '@utils/exceptions';
import { StatusCode } from '@interfaces/status.interface';
import { userAuthTransform } from '@transforms/user.transform';
import { findRoleByAccessLevel } from '@services/roles.service';
import { UserType } from '../interfaces/role.interface';
import { uploadAvatar } from './cloudinary.service';

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
  const defaultRole = await findRoleByAccessLevel(0);
  const isUserExists = await DB.manager.findOneBy(User, [{ nickname }, { email }]);
  if (isUserExists) throw new ControlledException('An account with this email or nickname already exists.');
  const user = await DB.manager.save(User, {
    name,
    secondName,
    nickname,
    email,
    password: generateHash(password),
    roleId: defaultRole.id,
  });
  const tokens = generateTokens(user.id);
  await saveRefreshToken(user.id, tokens.refreshToken);
  return userAuthTransform(tokens, user, defaultRole);
};

export const refresh = async (refreshToken: string) => {
  const userId = validateRefreshToken(refreshToken);
  const tokenFromDB = await findToken(refreshToken);
  if (!userId || !tokenFromDB) {
    throw new ControlledException('Incorrect token', StatusCode.UNAUTHORIZED);
  }
  const user = await DB.manager.findOneOrFail(User, { where: { id: userId }, relations: { role: true } });
  const tokens = generateTokens(userId);
  await saveRefreshToken(userId, tokens.refreshToken);
  return userAuthTransform(tokens, user, user.role);
};

export const changeProfile = async (id: string, name: string, secondName: string, nickname: string) => {
  const user = await DB.manager.findOneByOrFail(User, { id });
  const anotherUserWithNickname = await DB.manager.findOneBy(User, { nickname });
  if (anotherUserWithNickname && user.id !== anotherUserWithNickname.id) {
    throw new ControlledException('The chosen nickname is already used by someone', StatusCode.CONFLICT);
  }
  const changedProfileResult = await DB.createQueryBuilder()
    .update(User)
    .set({ name, secondName, nickname })
    .where({ id })
    .returning(['name', 'secondName', 'nickname'])
    .execute();
  return {
    name: changedProfileResult.raw[0].name,
    secondName: changedProfileResult.raw[0].secondName,
    nickname: changedProfileResult.raw[0].nickname,
  };
};

export const changeEmail = async (id: string, email: string, password: string) => {
  const user = await DB.manager.findOneByOrFail(User, { id });
  if (user.password !== generateHash(password)) {
    throw new ControlledException('Incorrect current password', StatusCode.NOT_FOUND);
  }
  const anotherUserWithEmail = await DB.manager.findOneBy(User, { email });
  if (anotherUserWithEmail && user.id !== anotherUserWithEmail.id) {
    throw new ControlledException('This email is already used by someone', StatusCode.CONFLICT);
  }
  const changedEmailResult = await DB.createQueryBuilder()
    .update(User)
    .set({ email })
    .where({ id })
    .returning(['email'])
    .execute();
  return { email: changedEmailResult.raw[0].email };
};

export const changePassword = async (id: string, password: string, newPassword: string) => {
  const changedPasswordResult = await DB.createQueryBuilder()
    .update(User)
    .set({ password: generateHash(newPassword) })
    .where({ id, password: generateHash(password) })
    .returning(['password'])
    .execute();
  if (changedPasswordResult.affected === 0) {
    throw new ControlledException('Incorrect current password', StatusCode.NOT_FOUND);
  }
  return { password: true };
};

export const changeType = async (id: string, type: UserType) => {
  const changedTypeResult = await DB.createQueryBuilder()
    .update(User)
    .set({ type })
    .where({ id })
    .returning(['type'])
    .execute();
  return { type: changedTypeResult.raw[0].type };
};

export const changeAvatar = async (id: string, avatar: string) => {
  if (avatar === 'default') {
    const changedAvatarResult = await DB.createQueryBuilder()
      .update(User)
      .set({
        avatar: 'https://res.cloudinary.com/fyfka/image/upload/v1648030948/Helios-images/default-avatar_aalssv.svg',
      })
      .where({ id })
      .returning(['avatar'])
      .execute();
    return { avatar: changedAvatarResult.raw[0].avatar };
  } else {
    const cloudinaryUploadResult = await uploadAvatar(avatar);
    const changedAvatarResult = await DB.createQueryBuilder()
      .update(User)
      .set({ avatar: cloudinaryUploadResult.secure_url })
      .where({ id })
      .returning(['avatar'])
      .execute();
    return { avatar: changedAvatarResult.raw[0].avatar };
  }
};
