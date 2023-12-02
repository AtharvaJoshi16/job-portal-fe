export interface LoginPageProps {
  onLogin: (userData: UserLoginData) => Promise<LoginApiResponse>;
}

export interface UserLoginData {
  email: string;
  password?: string;
  isGoogleLogin?: boolean;
}

export interface LoginApiResponse {
  user?: string;
  token?: string;
  message?: string;
}

export interface CredentialResponse {
  credential?: string;
  clientId?: string;
  select_by?: string;
}
