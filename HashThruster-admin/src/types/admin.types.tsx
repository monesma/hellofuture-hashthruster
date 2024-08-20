export interface RegisterAdmin {
    refreshToken: string;
    accessToken: string;
    public_key: string;
    token: string;
    role: string;
    email: string;
    first_name: string;
    last_name: string;
    sendEmail: string;
}

export interface LoginAdmin {
    email: string;
    password: string;
}

export interface UpdatePassword {
    id: string;
    password: string;
}

export interface UpdateAdminStatus {
    id: string;
    refreshToken: string | null;
    public_key: string;
    email: string;
    accessToken: string | null;
    role: 'admin' | 'superAdmin'
    status: string;
}
  
export interface AuthPKI {
    refreshToken: string | null;
    public_key: string;
    id: string;
    email: string;
    accessToken: string | null;
    role: 'admin' | 'superAdmin';
}