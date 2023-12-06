import axios from "axios";

export const deleteJob = async (jobId: string, recruiter_id: string) => {
  const response = await axios.post(
    `http://localhost:8081/jobs/v1/delete-job?recruiter_id=${recruiter_id}&job_id=${jobId}`
  );
  return response.data;
};
