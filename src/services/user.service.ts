import { Certificate } from '../models/certificate.model';
import { Role } from '../models/role.model';
import { Student } from '../models/student.model';

import { LessThanOrEqual } from 'typeorm';

import { DB } from '@databases';
import { UserType } from '@interfaces/role.interface';
import { StatusCode } from '@interfaces/status.interface';
import { User } from '@models/user.model';
import { Transforms } from '@transforms';
import { Utils } from '@utils';

import CloudinaryService from './cloudinary.service';
import RoleService from './role.service';
import TokenService from './token.service';

const userRole = async (
  userId: string,
  avatar: string,
  email: string,
  name: string,
  nickname: string,
  secondName: string,
  type: UserType,
) => {
  const user = await DB.manager.findOne(User, {
    where: { id: userId, avatar, email, name, nickname, secondName, type },
    relations: { role: true },
  });
  if (!user) {
    throw new Utils.Exceptions.ControlledException('User not found', StatusCode.UNAUTHORIZED);
  }
  return Transforms.User.toUserRole(user.role);
};

const auth = async (login: string, password: string) => {
  const hashedPassword = Utils.Crypt.generateHash(password);
  const user = await DB.manager.findOne(User, {
    where: [
      { password: hashedPassword, email: login },
      { password: hashedPassword, nickname: login },
    ],
    relations: { role: true },
  });
  if (!user) {
    throw new Utils.Exceptions.ControlledException('Invalid email or password', StatusCode.UNAUTHORIZED);
  }
  const tokens = TokenService.generateTokensById(user.id);
  await TokenService.saveRefreshToken(user.id, tokens.refreshToken);
  return Transforms.User.toUserAuth(tokens, user, user.role);
};

const signup = async (name: string, secondName: string, nickname: string, email: string, password: string) => {
  const defaultRole = await RoleService.findRoleByAccessLevel(0);
  const isUserExists = await DB.manager.findOneBy(User, [{ nickname }, { email }]);
  if (isUserExists) {
    throw new Utils.Exceptions.ControlledException('An account with this email or nickname already exists.');
  }
  const user = await DB.manager.save(User, {
    name,
    secondName,
    nickname,
    email,
    password: Utils.Crypt.generateHash(password),
    roleId: defaultRole.id,
  });
  const tokens = TokenService.generateTokensById(user.id);
  await TokenService.saveRefreshToken(user.id, tokens.refreshToken);
  return Transforms.User.toUserAuth(tokens, user, defaultRole);
};

const refresh = async (refreshToken: string) => {
  const userId = TokenService.validateRefreshToken(refreshToken);
  const tokenFromDB = await TokenService.findToken(refreshToken);
  if (!userId || !tokenFromDB) {
    throw new Utils.Exceptions.ControlledException('Incorrect token', StatusCode.UNAUTHORIZED);
  }
  const user = await DB.manager.findOneOrFail(User, { where: { id: userId }, relations: { role: true } });
  const tokens = TokenService.generateTokensById(userId);
  await TokenService.saveRefreshToken(userId, tokens.refreshToken);
  return Transforms.User.toUserAuth(tokens, user, user.role);
};

const changeProfile = async (id: string, name: string, secondName: string, nickname: string) => {
  const user = await DB.manager.findOneByOrFail(User, { id });
  const anotherUserWithNickname = await DB.manager.findOneBy(User, { nickname });
  if (anotherUserWithNickname && user.id !== anotherUserWithNickname.id) {
    throw new Utils.Exceptions.ControlledException(
      'The chosen nickname is already used by someone',
      StatusCode.CONFLICT,
    );
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

const changeEmail = async (id: string, email: string, password: string) => {
  const user = await DB.manager.findOneByOrFail(User, { id });
  if (user.password !== Utils.Crypt.generateHash(password)) {
    throw new Utils.Exceptions.ControlledException('Incorrect current password', StatusCode.NOT_FOUND);
  }
  const anotherUserWithEmail = await DB.manager.findOneBy(User, { email });
  if (anotherUserWithEmail && user.id !== anotherUserWithEmail.id) {
    throw new Utils.Exceptions.ControlledException('This email is already used by someone', StatusCode.CONFLICT);
  }
  await DB.createQueryBuilder().update(User).set({ email }).where({ id }).returning(['email']).execute();
  return true;
};

const changePassword = async (id: string, password: string, newPassword: string) => {
  const changedPasswordResult = await DB.createQueryBuilder()
    .update(User)
    .set({ password: Utils.Crypt.generateHash(newPassword) })
    .where({ id, password: Utils.Crypt.generateHash(password) })
    .returning(['password'])
    .execute();
  if (changedPasswordResult.affected === 0) {
    throw new Utils.Exceptions.ControlledException('Incorrect current password', StatusCode.NOT_FOUND);
  }
  return true;
};

const changeType = async (id: string, type: UserType) => {
  const changedTypeResult = await DB.createQueryBuilder()
    .update(User)
    .set({ type })
    .where({ id })
    .returning(['type'])
    .execute();
  return { type: changedTypeResult.raw[0].type };
};

const changeAvatar = async (id: string, avatar: string) => {
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
    const cloudinaryUploadResult = await CloudinaryService.uploadImage(avatar);
    const changedAvatarResult = await DB.createQueryBuilder()
      .update(User)
      .set({ avatar: cloudinaryUploadResult.secure_url })
      .where({ id })
      .returning(['avatar'])
      .execute();
    return { avatar: changedAvatarResult.raw[0].avatar };
  }
};

const userProfile = async (nickname: string) => {
  return DB.manager.findOne(User, {
    where: {
      nickname,
      type: UserType.PUBLIC,
    },
    relations: ['role'],
    select: ['id', 'name', 'secondName', 'nickname', 'avatar', 'type', 'email'],
  });
};

const fullUserProfile = async (nickname: string, accessLevel: number) => {
  return DB.manager.findOne(User, {
    where: { nickname, role: { accessLevel: LessThanOrEqual(accessLevel) } },
    relations: ['role'],
    select: ['id', 'name', 'secondName', 'nickname', 'avatar', 'type', 'email'],
  });
};

const selfUserProfile = async (nickname: string, userId: string) => {
  return DB.manager.findOne(User, {
    where: { nickname, id: userId },
    relations: ['role'],
    select: ['id', 'name', 'secondName', 'nickname', 'avatar', 'type', 'email'],
  });
};

const userCourses = async (userId: string) => {
  const courses = await DB.manager.find(Student, {
    where: { userId },
    relations: ['course'],
  });
  return courses.map((course) => course.course);
};

const changeRole = async (id: string, roleName: string, userId: string) => {
  const user = await DB.manager.findOne(User, {
    where: {
      id,
    },
    relations: ['role'],
  });
  const targetUser = await DB.manager.findOne(User, {
    where: {
      id: userId,
    },
    relations: ['role'],
  });
  if (!user || !targetUser || user?.role.accessLevel <= targetUser?.role.accessLevel) {
    throw new Utils.Exceptions.ControlledException('You can not change role of this user', StatusCode.FORBIDDEN);
  }
  const role = await DB.manager.findOneByOrFail(Role, { roleName });
  await DB.createQueryBuilder().update(User).set({ roleId: role.id }).where({ id: userId }).execute();
  return true;
};

const certificates = async (userId: string) => {
  const studentRows = await DB.manager.find(Student, {
    where: { userId },
    relations: {
      certificates: true,
    },
  });
  return Transforms.User.toCertificates(studentRows.filter((student) => student.certificates.length > 0));
};

const certificate = async (certificateId: string) => {
  const certificate = await DB.manager.findOneBy(Certificate, { id: certificateId });
  return certificate;
};

export default {
  auth,
  signup,
  refresh,
  changeProfile,
  changeEmail,
  changePassword,
  changeType,
  changeAvatar,
  userRole,
  userProfile,
  fullUserProfile,
  userCourses,
  selfUserProfile,
  changeRole,
  certificates,
  certificate,
};
