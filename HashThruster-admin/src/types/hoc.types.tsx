import { ReactNode } from 'react';

export interface RequireAuth {
    children: ReactNode;
    auth: boolean;
    superAdmin: boolean;
}