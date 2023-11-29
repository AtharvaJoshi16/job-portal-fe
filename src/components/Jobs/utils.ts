import axios from "axios";

const { _id: id } = JSON.parse(localStorage.user);

export const getJobs = async () => {
  const response = await axios.get("http://localhost:8081/jobs/v1/view-jobs");
  return response.data;
};

export const filterJobs = async (filter: string) => {
  const response = await axios.get(
    `http://localhost:8081/jobs/v1/filter?filter=${filter}&userId=${id}`
  );
  return response.data;
};

export const saveJob = async (job_id: string) => {
  const response = await axios.post(
    `http://localhost:8081/jobs/v1/save-job?userId=${id}&job_id=${job_id}`
  );
  return response.data;
};

export const removedSavedJob = async (job_id: string) => {
  const response = await axios.post(
    `http://localhost:8081/jobs/v1/remove-saved-job?userId=${id}&job_id=${job_id}`
  );
  return response.data;
};

export const getSavedJobs = async (populate?: boolean) => {
  let response;
  if (populate) {
    response = await axios.get(
      `http://localhost:8081/jobs/v1/saved-jobs?userId=${id}&populated=true`
    );
  } else {
    response = await axios.get(
      `http://localhost:8081/jobs/v1/saved-jobs?userId=${id}`
    );
  }

  return response.data;
};
