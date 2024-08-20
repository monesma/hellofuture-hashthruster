export interface CreatePartnerQuery {
    name: string;
    creation_date: Date;
    public_key: string;
    private_key: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string | null;
    phone: string;
    status: 'pending';
  }
  
  export interface CreateFrontPartnerQuery {
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  }
  
  export interface UpdatePartnerQuery {
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  }
  
  export interface UpdatePartnerKeyQuery {
    public_key: string;
    private_key: string;
  }
  
  export interface UpdatePartnerStatusQuery {
    status: 'pending' | 'validated' | 'blocked' | 'canceled';
  }
  
  export interface LoginPartnerQuery {
    email: string;
    password: string;
  }