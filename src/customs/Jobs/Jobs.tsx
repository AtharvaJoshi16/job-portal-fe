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
import { getFromStorage } from "@/utils/localStorage.utils";
import { deleteJob } from "@/apis/deleteJob";

const Jobs = ({ bookmark, applies }: JobsProps) => {
  const [jobs, setJobs] = useState<JobProps[]>();
  const { _id: userId, role } = getFromStorage("user");
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<AppliedJobs[] | undefined>();
  const { state } = useLocation();
  const appliedIds = appliedJobs?.map((job) => job._id);

  const setData = useCallback(() => {
    if (state?.searchText) {
      searchJob(state?.searchText).then((resp) => {
        setJobs(resp?.results);
      });
    }
    if (bookmark) {
      getSavedJobs(userId, true).then((resp) => {
        setJobs(resp?.jobs?.savedJobs);
        setBookmarks(resp?.ids);
      });
    } else {
      getSavedJobs(userId).then((resp) => setBookmarks(resp?.jobs?.savedJobs));
    }
    getAppliedJobs(userId).then((resp) => {
      setAppliedJobs(resp?.result);
    });
  }, [bookmark, state, userId]);
  const checkBookmark = useCallback(() => {
    if (!bookmark) {
      if (state?.filter) {
        filterJobs(state?.filter, userId).then((resp) => setJobs(resp?.jobs));
      } else {
        role === "employee"
          ? getJobs().then((resp) => setJobs(resp?.jobs))
          : getJobs(userId).then((resp) => setJobs(resp?.jobs));
      }
    }
  }, [state?.filter, bookmark, userId, role]);

  useEffect(() => {
    setData();
    checkBookmark();
  }, [setData, checkBookmark]);

  const handleJobDelete = (job_id: string, recruiter_id: string) => {
    deleteJob(job_id, recruiter_id).then((resp) => {
      setJobs(resp?.jobs);
      alert(resp?.message);
    });
  };

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
        {jobs?.map((job) =>
          applies ? (
            appliedIds?.includes(job._id) && (
              <Job
                variant={applies ? "apply" : "default"}
                {...job}
                onSaveJob={saveJob}
                onDelete={() => handleJobDelete(job._id, userId)}
                onRemoveSavedJob={removedSavedJob}
                bookmarks={bookmarks}
                appliedJobs={appliedJobs}
              />
            )
          ) : (
            <Job
              variant={applies ? "apply" : "default"}
              {...job}
              onSaveJob={saveJob}
              onDelete={() => handleJobDelete(job._id, userId)}
              onRemoveSavedJob={removedSavedJob}
              bookmarks={bookmarks}
              appliedJobs={appliedJobs}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Jobs;
