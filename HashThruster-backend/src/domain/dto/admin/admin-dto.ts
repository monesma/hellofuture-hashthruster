export interface CreateAdminQuery {
    creation_date: Date;
    public_key: string;
    private_key: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string | null;
    role: 'admin' | 'superAdmin';
    status: 'pending';
  }
  
  export interface CreateFrontAdminQuery {
    first_name: string;
    last_name: string;
    sendEmail: string;
    role: 'admin' | 'superAdmin';
    sendRole?: 'admin' | 'superAdmin'
  }
  
  export interface UpdateAdminQuery {
    first_name: string;
    last_name: string;
    email: string;
  }
  
  export interface UpdateAdminKeyQuery {
    public_key: string;
    private_key: string;
  }
  
  export interface UpdateAdminStatusQuery {
    status: 'pending' | 'validated' | 'blocked' | 'canceled';
  }
  
  export interface LoginAdminQuery {
    email: string;
    password: string;
  }

  export interface AuthPKI {
    refreshToken: string;
    public_key: string;
    id: string;
    email: string;
    accessToken: string;
    role: 'admin' | 'superAdmin';
}