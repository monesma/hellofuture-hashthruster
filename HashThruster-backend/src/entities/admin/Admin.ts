import { CreateAdminQuery } from '../../domain/dto/admin/admin-dto';

export default class Admin {
  public creation_date: Date;
  public public_key: string;
  public private_key: string;
  public first_name: string;
  public last_name: string;
  public email: string;
  public role: 'admin' | 'superAdmin';
  public status: 'pending' | 'validated' | 'blocked' | 'canceled';

  constructor({
    creation_date,
    public_key,
    private_key,
    first_name,
    last_name,
    email,
    role,
    status,
  }: CreateAdminQuery) {
    this.creation_date = creation_date;
    this.public_key = public_key;
    this.private_key = private_key;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.role = role;
    this.status = status;
  }
}
