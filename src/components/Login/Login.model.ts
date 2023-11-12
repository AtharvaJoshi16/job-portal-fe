export interface LoginPageProps {
  onLogin: (userData: UserLoginData) => Promise<LoginApiResponse>;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  userId?: string;
  token?: string;
  message?: string;
}

export interface CredentialResponse {
  credential?: string;
  clientId?: string;
  select_by?: string;
}
