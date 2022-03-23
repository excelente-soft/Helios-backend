import DB from '@databases';
import { Role } from '@models/role.model';
import { ControlledException } from '@utils/exceptions';

export const findRoleByAccessLevel = async (accessLevel: number) => {
  const role = await DB.manager.findOneBy(Role, { accessLevel: 0 });
  if (!role) throw new ControlledException(`Role with access level ${accessLevel} doesn't exists`);
  return role;
};
