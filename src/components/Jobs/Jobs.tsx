import { useEffect, useState } from "react";
import { Job } from "..";
import "./Jobs.scss";
import { JobProps } from "../Job/Job.model";
import {
  filterJobs,
  getJobs,
  getSavedJobs,
  removedSavedJob,
  saveJob,
} from "./utils";
import { useLocation } from "react-router";
import { JobsProps } from "./Jobs.model";

const Jobs = ({ bookmark }: JobsProps) => {
  const [jobs, setJobs] = useState<JobProps[]>();
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const { state } = useLocation();
  useEffect(() => {
    (async () => {
      let response;
      if (bookmark) {
        response = await getSavedJobs(true);
        setJobs(response?.jobs?.savedJobs);
        setBookmarks(response?.ids);
      } else {
        response = await getSavedJobs();
        setBookmarks(response?.jobs?.savedJobs);
      }
    })();
  }, [bookmark]);
  useEffect(() => {
    (async () => {
      if (!bookmark) {
        if (state?.filter) {
          const response = await filterJobs(state?.filter);
          setJobs(response?.jobs);
        } else {
          const response = await getJobs();
          setJobs(response?.jobs);
        }
      }
    })();
  }, [state, bookmark]);
  return (
    <div className="jobs">
      <div className="jobs__grid-view">
        {jobs?.map((job) => (
          <Job
            {...job}
            onSaveJob={saveJob}
            onRemoveSavedJob={removedSavedJob}
            bookmarks={bookmarks}
          />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
