import axios from "axios";

export const searchJob = async (text: string) => {
  const response = await axios.get(
    `http://localhost:8081/jobs/v1/search?text=${text}`
  );
  return response.data;
};
