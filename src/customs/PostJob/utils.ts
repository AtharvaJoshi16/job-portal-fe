import axios from "axios";

export const createJob = async (jobData, recruiter_id: string) => {
  const response = await axios.post(
    `http://localhost:8081/jobs/v1/create-edit-job?recruiter_id=${recruiter_id}`,
    jobData
  );
  return response.data;
};
