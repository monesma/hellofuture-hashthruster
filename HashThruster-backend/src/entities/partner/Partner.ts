import { CreatePartnerQuery } from '../../domain/dto/partner/partner-dto';

export default class Partner {
  public name: string;
  public creation_date: Date;
  public public_key: string;
  public private_key: string;
  public first_name: string;
  public last_name: string;
  public email: string;
  public phone: string;
  public status: 'pending' | 'validated' | 'blocked' | 'canceled';

  constructor({
    name,
    creation_date,
    public_key,
    private_key,
    first_name,
    last_name,
    email,
    phone,
    status,
  }: CreatePartnerQuery) {
    this.name = name;
    this.creation_date = creation_date;
    this.public_key = public_key;
    this.private_key = private_key;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.status = status;
  }
}
