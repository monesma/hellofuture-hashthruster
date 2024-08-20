import { PartnerQuery } from '../../domain/types/partner-types';
import { AdminQuery } from '../../domain/types/admin-types';
import { ProjectQuery } from '../../domain/types/project-types';
import { TokenQuery } from '../../domain/types/token-types';

const database: {
  partner: PartnerQuery[];
  admin: AdminQuery[];
  project: ProjectQuery[];
  token: TokenQuery[];
} = {
  partner: [],
  admin: [],
  project: [],
  token: []
};

export default database;
