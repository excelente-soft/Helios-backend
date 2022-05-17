import { LessThan } from 'typeorm';

import { DB } from '@databases';
import { StatusCode } from '@interfaces/status.interface';
import { Role } from '@models/role.model';
import { Utils } from '@utils';

const createRole = async (userAccessLevel: number, accessLevel: number, color: string, roleName: string) => {
  if (userAccessLevel < accessLevel) {
    throw new Utils.Exceptions.ControlledException('You have no permission to create this role', StatusCode.FORBIDDEN);
  }
  const existingRole = await DB.manager.findOneBy(Role, [{ accessLevel }, { color }, { roleName }]);
  if (existingRole) {
    if (existingRole.accessLevel == accessLevel) {
      throw new Utils.Exceptions.ControlledException(
        'A role with this access level already exists',
        StatusCode.FORBIDDEN,
      );
    } else if (existingRole.roleName == roleName) {
      throw new Utils.Exceptions.ControlledException('A role with this name already exists', StatusCode.FORBIDDEN);
    } else if (existingRole.color == color) {
      throw new Utils.Exceptions.ControlledException('A role with this color already exists', StatusCode.FORBIDDEN);
    }
  }
  await DB.manager.save(Role, { accessLevel, color, roleName });
  return true;
};

const findRoleByAccessLevel = async (accessLevel: number) => {
  const role = await DB.manager.findOneBy(Role, { accessLevel: 0 });
  if (!role) throw new Utils.Exceptions.ControlledException(`Role with access level ${accessLevel} doesn't exists`);
  return role;
};

const roles = async (accessLevel: number) => {
  const roles = await DB.manager.find(Role, {
    where: {
      accessLevel: LessThan(accessLevel),
    },
    order: {
      accessLevel: 'ASC',
    },
  });
  return roles;
};

export default { createRole, findRoleByAccessLevel, roles };
