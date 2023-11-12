import axios from "axios";
import { UserLoginData } from "./Login.model";

export const onLogin = async (userData: UserLoginData) => {
  const response = await axios.post(
    "http://localhost:8080/api/v1/login",
    userData
  );
  console.log(response);
  return response.data;
};
