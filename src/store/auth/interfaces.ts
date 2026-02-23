export interface IAuthUser {
  email: string;
  firstName: string;
  secondName: string;
}

export interface IAuthState {
  user: IAuthUser | null;
  isAuthenticated: boolean;
}

