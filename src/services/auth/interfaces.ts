export interface IAuthInitiateRequest {
  email: string;
}

export interface IAuthInitiateResponse {
  success: string;
}

export interface IAuthConfirmRequest {
  email: string;
  code: string;
}

export interface IAuthConfirmResponse {
  token: string;
  customerId: string;
  firstName: string;
  secondName: string;
}
