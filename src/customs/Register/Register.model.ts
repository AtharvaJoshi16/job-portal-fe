export interface RegisterPageProps {
  onVerify: (email: string) => Promise<VerifyApiResponse>;
  onSubmit: (userData: UserData) => Promise<RegisterApiResponse>;
}

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  orgId?: string;
  organization?: string;
  employeeId?: string;
}

export interface VerifyApiResponse {
  code: number;
  message: string;
}

export type RegisterApiResponse = Pick<VerifyApiResponse, "message">;
