import { AdminQuery } from '../../../../domain/types/admin-types';

export function adapterMongoDataAdmin(
  mongoAdminResponse: any,
): AdminQuery {
  return {
    _id: mongoAdminResponse._id.toString(),
    first_name: mongoAdminResponse.first_name,
    last_name: mongoAdminResponse.last_name,
    creation_date: mongoAdminResponse.creation_date,
    public_key: mongoAdminResponse.public_key,
    private_key: mongoAdminResponse.private_key,
    email: mongoAdminResponse.email,
    password: mongoAdminResponse.password,
    role: mongoAdminResponse.role,
    status: mongoAdminResponse.status,
  };
}
