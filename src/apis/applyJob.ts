import axios from "axios";

const { id } = JSON.parse(localStorage.user);

export const applyJob = async (jobId: string) => {
  const response = await axios.post(
    `http://localhost:8081/jobs/v1/apply-job?userId=${id}&job_id=${jobId}`
  );
  return response.data;
};

export const getAppliedJobs = async () => {
  const response = await axios.get(
    `http://localhost:8080/api/v1/get-applied-jobs?userId=${id}`
  );
  return response.data;
};
