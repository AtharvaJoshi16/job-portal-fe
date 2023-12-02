import axios from "axios";

export const getJobs = async () => {
  const response = await axios.get("http://localhost:8081/jobs/v1/view-jobs");
  return response.data;
};

export const filterJobs = async (filter: string, userId: string) => {
  const response = await axios.get(
    `http://localhost:8081/jobs/v1/filter?filter=${filter}&userId=${userId}`
  );
  return response.data;
};

export const saveJob = async (job_id: string, userId: string) => {
  const response = await axios.post(
    `http://localhost:8081/jobs/v1/save-job?userId=${userId}&job_id=${job_id}`
  );
  return response.data;
};

export const removedSavedJob = async (job_id: string, userId: string) => {
  const response = await axios.post(
    `http://localhost:8081/jobs/v1/remove-saved-job?userId=${userId}&job_id=${job_id}`
  );
  return response.data;
};

export const getSavedJobs = async (userId: string, populate?: boolean) => {
  let response;
  if (populate) {
    response = await axios.get(
      `http://localhost:8081/jobs/v1/saved-jobs?userId=${userId}&populated=true`
    );
  } else {
    response = await axios.get(
      `http://localhost:8081/jobs/v1/saved-jobs?userId=${userId}`
    );
  }

  return response.data;
};
