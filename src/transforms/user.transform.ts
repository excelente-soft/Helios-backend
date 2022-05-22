import { IPairTokens } from '@interfaces/token.interface';
import { Role } from '@models/role.model';
import { Student } from '@models/student.model';
import { User } from '@models/user.model';

const toUserAuth = (tokens: IPairTokens, user: User, role: Role) => {
  const { refreshToken, accessToken } = tokens;
  const { name, secondName, nickname, email, avatar, type } = user;
  const { roleName, color, accessLevel } = role;

  return {
    refreshToken: refreshToken,
    user: {
      name: name,
      secondName: secondName,
      nickname: nickname,
      email: email,
      token: accessToken,
      avatar: avatar,
      type: type,
      role: {
        roleName: roleName,
        color: color,
        accessLevel: accessLevel,
      },
    },
  };
};

const toUserRole = (role: Role) => {
  return {
    accessLevel: role.accessLevel,
    color: role.color,
    roleName: role.roleName,
  };
};

const toCertificates = (rows: Student[]) => {
  return rows.map((row) => row.certificates[0]);
};

export default {
  toUserAuth,
  toUserRole,
  toCertificates,
};
