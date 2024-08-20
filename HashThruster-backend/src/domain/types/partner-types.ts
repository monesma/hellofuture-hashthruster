export interface PartnerQuery {
    _id: string;
    name: string;
    creation_date: Date;
    public_key: string;
    private_key: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string | null;
    phone: string;
    status: 'pending' | 'validated' | 'blocked' | 'canceled';
  }
  