import axios from "axios";
import { UserProfileData } from "./Profile.model";

const { _id: id, email } = JSON.parse(localStorage.user);

export const onEdit = async (UserProfileData: UserProfileData) => {
  const response = await axios.post(
    `http://localhost:8080/api/v1/add-profile?userId=${id}&email=${email}`,
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

export const saveProfileImage = async (formData: FormData) => {
  const response = await axios.post(
    `http://localhost:8080/api/v1/upload-profile-image?userId=${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const getProfileImage = async () => {
  const response = await axios.get(
    `http://localhost:8080/api/v1/get-profile-image?userId=${id}`
  );
  if (response?.data?.code === 400 || response.data === null) {
    return {
      code: 400,
      url: "/assets/dummy_profile_img.png",
    };
  } else {
    return {
      url: `http://localhost:8080/api/v1/get-profile-image?userId=${id}`,
    };
  }
};

export const saveResume = async (formdata: FormData) => {
  const response = await axios.post(
    `http://localhost:8080/api/v1/upload-resume?userId=${id}`,
    formdata,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const getResumeFileName = async () => {
  const response = await axios.get(
    `http://localhost:8080/api/v1/get-resume?userId=${id}`
  );
  return response.data;
};
