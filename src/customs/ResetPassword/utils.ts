import axios from "axios";

export const onResetPassword = async (newPassword: string, email: string) => {
  const response = await axios.post(
    `http://localhost:8080/api/v1/reset-password?email=${email}`,
    {
      newPassword: newPassword,
    }
  );
  return response.data;
};
