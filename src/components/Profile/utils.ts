import axios from "axios";
import { UserProfileData } from "./Profile.model";

export const onEdit = async (userProfileData: UserProfileData | null) => {
  const { id, email } = JSON.parse(localStorage.user);
  const response = await axios.post(
    `http://localhost:8080/api/v1/add-profile?userId=${id}&email=${email}`,
    userProfileData
  );
  return response.data;
};

export const getProfile = async (userId: string) => {
  const response = await axios.get(
    `http://localhost:8080/api/v1/get-profile?userId=${userId}`
  );
  console.log(response.data);
  return response.data;
};
