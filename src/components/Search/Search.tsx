import { useLocation } from "react-router";
import { JobProps } from "../Job/Job.model";

const Search = () => {
  const { state } = useLocation();
  const jobs: JobProps[] = state?.results;

  return (
    
  )
};

export default Search;
