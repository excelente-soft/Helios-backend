import { Role } from '@models/role.model';
import { User } from '@models/user.model';

export const userAuthTransform = (tokens: { refreshToken: string; accessToken: string }, user: User, role: Role) => {
  return {
    refreshToken: tokens.refreshToken,
    user: {
      name: user.name,
      secondName: user.secondName,
      nickname: user.nickname,
      email: user.email,
      token: tokens.accessToken,
      avatar: user.avatar,
      role: {
        roleName: role.roleName,
        color: role.color,
        accessLevel: role.accessLevel,
      },
    },
  };
};
