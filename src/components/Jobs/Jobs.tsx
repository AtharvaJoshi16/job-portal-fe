import { useEffect, useState, useCallback } from "react";
import { Job } from "..";
import "./Jobs.scss";
import { AppliedJobs, JobProps } from "../Job/Job.model";
import CircularProgress from "@mui/material/CircularProgress";
import {
  filterJobs,
  getJobs,
  getSavedJobs,
  removedSavedJob,
  saveJob,
} from "./utils";
import { useLocation } from "react-router";
import { JobsProps } from "./Jobs.model";
import { getAppliedJobs } from "../../apis/applyJob";
import { searchJob } from "../../apis/searchJob";

const Jobs = ({ bookmark, applies }: JobsProps) => {
  const [jobs, setJobs] = useState<JobProps[]>();
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<AppliedJobs[] | undefined>();
  const { state } = useLocation();

  const setData = useCallback(() => {
    if (state?.searchText) {
      searchJob(state?.searchText).then((resp) => {
        setJobs(resp?.results);
      });
    }
    if (bookmark) {
      getSavedJobs(true).then((resp) => {
        setJobs(resp?.jobs?.savedJobs);
        setBookmarks(resp?.ids);
      });
    } else {
      getSavedJobs().then((resp) => setBookmarks(resp?.jobs?.savedJobs));
    }
    getAppliedJobs().then((resp) => setAppliedJobs(resp?.result));
  }, [bookmark, state]);

  const checkBookmark = useCallback(() => {
    if (!bookmark) {
      if (state?.filter) {
        filterJobs(state?.filter).then((resp) => setJobs(resp?.jobs));
      } else {
        getJobs().then((resp) => setJobs(resp?.jobs));
      }
    }
  }, [state?.filter, bookmark]);
  useEffect(() => {
    setData();
    checkBookmark();
  }, [setData, checkBookmark]);

  return !jobs ? (
    <CircularProgress
      style={{ width: "60px", height: "60px" }}
      className="app__circular-progress"
    />
  ) : (
    <div className="jobs">
      {state?.searchText && (
        <p className="jobs__search-results">
          {jobs?.length} results for {`"${state?.searchText}"`}
        </p>
      )}
      <div className="jobs__grid">
        {jobs?.map((job) => (
          <Job
            variant={applies ? "apply" : "default"}
            {...job}
            onSaveJob={saveJob}
            onRemoveSavedJob={removedSavedJob}
            bookmarks={bookmarks}
            appliedJobs={appliedJobs}
          />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
