import axios from "axios";

export const applyJob = async (jobId: string, userId: string) => {
  const response = await axios.post(
    `http://localhost:8081/jobs/v1/apply-job?userId=${userId}&job_id=${jobId}`
  );
  return response.data;
};

export const getAppliedJobs = async (userId: string) => {
  const response = await axios.get(
    `http://localhost:8080/api/v1/get-applied-jobs?userId=${userId}`
  );
  return response.data;
};
