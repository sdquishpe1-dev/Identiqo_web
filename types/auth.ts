// types/auth.ts
export type Role = 'ADMIN' | 'USER' ;

export interface AuthResponse {
  token: string;
  hasProfile: boolean;
  role: Role;
}