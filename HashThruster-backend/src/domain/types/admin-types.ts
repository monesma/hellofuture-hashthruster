export interface AdminQuery {
    _id: string;
    creation_date: Date;
    public_key: string;
    private_key: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string | null;
    role: 'admin' | 'superAdmin';
    status: 'pending' | 'validated' | 'blocked' | 'canceled';
  }
  