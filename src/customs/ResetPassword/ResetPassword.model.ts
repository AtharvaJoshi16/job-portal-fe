export interface ResetPasswordProps {
  onResetPassword: (
    newPassword: string,
    email: string
  ) => Promise<ResetPasswordApiResponse>;
}

export interface ResetPasswordApiResponse {
  message: string;
}
