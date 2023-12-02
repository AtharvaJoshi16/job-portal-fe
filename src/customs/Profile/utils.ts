import axios from "axios";
import { UserProfileData } from "./Profile.model";

export const onEdit = async (
  UserProfileData: UserProfileData,
  userId: string,
  email: string
) => {
  const response = await axios.post(
    `http://localhost:8080/api/v1/add-profile?userId=${userId}&email=${email}`,
    UserProfileData
  );
  return response.data;
};

export const getProfile = async (userId: string) => {
  const response = await axios.get(
    `http://localhost:8080/api/v1/get-profile?userId=${userId}`
  );
  return response.data;
};

export const saveProfileImage = async (formData: FormData, userId) => {
  const response = await axios.post(
    `http://localhost:8080/api/v1/upload-profile-image?userId=${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const getProfileImage = async (userId: string) => {
  const response = await axios.get(
    `http://localhost:8080/api/v1/get-profile-image?userId=${userId}`
  );
  if (response?.data?.code === 400 || response.data === null) {
    return {
      code: 400,
      url: "/assets/dummy_profile_img.png",
    };
  } else {
    return {
      url: `http://localhost:8080/api/v1/get-profile-image?userId=${userId}`,
    };
  }
};

export const saveResume = async (formdata: FormData, userId: string) => {
  const response = await axios.post(
    `http://localhost:8080/api/v1/upload-resume?userId=${userId}`,
    formdata,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const getResumeFileName = async (userId: string) => {
  const response = await axios.get(
    `http://localhost:8080/api/v1/get-resume?userId=${userId}`
  );
  return response.data;
};
