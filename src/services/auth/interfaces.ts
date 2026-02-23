export interface IAuthInitiateRequest {
  email: string;
}

export interface IAuthConfirmRequest {
  email: string;
  code: string;
}

export interface IAuthConfirmResponse {
  token: string;
  firstName: string;
  secondName: string;
}

export interface IAuthUser {
  email: string;
  firstName: string;
  secondName: string;
}

