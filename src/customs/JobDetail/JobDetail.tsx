import { useParams } from "react-router-dom";
import { JobProps } from "../Job/Job.model";
import { JobDetailProps } from "./JobDetail.model";
import { useState, useEffect } from "react";
import { getJobByID, returnDateDifference } from "./utils";
import "./JobDetail.scss";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import PsychologyIcon from "@mui/icons-material/Psychology";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import StarsIcon from "@mui/icons-material/Stars";
import RoomIcon from "@mui/icons-material/Room";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedRoundedIcon from "@mui/icons-material/BookmarkAddedRounded";
import { Divider, Button, CircularProgress } from "@mui/material";
import { getSavedJobs, removedSavedJob, saveJob } from "../Jobs/utils";
import { applyJob, getAppliedJobs } from "../../apis/applyJob";
import TrackStatus from "../TrackStatus/TrackStatus";
const JobDetail = ({ jobData }: JobDetailProps) => {
  const [job, setJob] = useState<JobProps>();
  const { id } = useParams();
  const [saved, setSaved] = useState<boolean | undefined>();
  const [applied, setApplied] = useState<boolean | undefined>();
  const [appliedStatus, setJobStatus] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const dateDifference = job?.datePosted
    ? returnDateDifference(job?.datePosted)
    : "NA";
  useEffect(() => {
    if (jobData) {
      setJob(jobData);
    } else if (id) {
      getJobByID(id).then((resp) => setJob(resp?.jobs));
    }
    getSavedJobs().then((resp) => {
      if (resp?.jobs?.savedJobs?.includes(id)) {
        setSaved(true);
      } else {
        setSaved(false);
      }
    });

    getAppliedJobs().then((resp) => {
      const found = resp?.result?.find((j) => {
        return j._id === job?._id;
      });
      if (found) {
        setApplied(true);
        setJobStatus(found?.applicationStatus);
        setAppliedDate(found?.appliedDate);
      } else {
        setApplied(false);
      }
    });
  }, [id, job?._id, jobData]);

  const handleSave = async () => {
    const args = id ? id : jobData?._id ? jobData?._id : "";

    if (!saved) {
      const response = await saveJob(args);
      if (response?.code === 200) {
        setSaved(true);
      }
    } else {
      const response = await removedSavedJob(args);
      if (response?.code === 200) {
        setSaved(false);
      }
    }
  };

  const handleApply = async () => {
    if (job?._id) {
      const response = await applyJob(job._id);
      if (response?.code === 200) {
        setApplied(true);
      }
    }
  };
  return !job ? (
    <CircularProgress
      style={{ width: "60px", height: "60px" }}
      className="app__circular-progress"
    />
  ) : (
    <div className="job-detail">
      <div className="job-detail__header-section">
        <img
          src={
            job?.organizationLogo
              ? job?.organizationLogo
              : "/assets/organizationLogoPlaceholder.png"
          }
          alt="organization-logo"
          className="job-detail__header-section__logo"
        />
        <div className="job-detail__header-section__right">
          <p className="job-detail__header-section__right__role-org">
            <span className="job-detail__header-section__right__role-org__role">
              {job?.jobRole}
            </span>
            <span className="job-detail__header-section__right__role-org__org">
              {`at ${job?.organization}`}
            </span>
          </p>
          <p className="job-detail__header-section__right__posted-diff">
            {dateDifference}
          </p>
        </div>
      </div>
      <div className="job-detail__information">
        <div className="job-detail__information__item">
          <MapsHomeWorkIcon color="info" />
          <p className="job-detail__information__item__mode-ctc">
            <span className="job-detail__information__item__mode-ctc">
              {job?.ctc}
            </span>
            <Divider
              light
              orientation="vertical"
              flexItem
              sx={{
                background: "black",
                border: "1px solid black",
              }}
            />
            <span className="job-detail__information__item__mode-ctc">
              {`${job?.workingMode}`}
            </span>
            <Divider
              light
              orientation="vertical"
              flexItem
              sx={{
                background: "black",
                border: "1px solid black",
              }}
            />
            <span className="job-detail__information__item__mode-ctc">
              Full Time
            </span>
          </p>
        </div>
        <div className="job-detail__information__item">
          <RoomIcon color="info" />
          <p className="job-detail__information__item__locations-text">
            {job?.locations?.map((loc, index) =>
              index !== job?.locations.length - 1 ? (
                <>
                  <span>{loc}</span>
                  <Divider
                    light
                    orientation="vertical"
                    flexItem
                    sx={{
                      background: "black",
                      border: "1px solid black",
                    }}
                  />
                </>
              ) : (
                <span>{loc}</span>
              )
            )}
          </p>
        </div>
        <div className="job-detail__information__item">
          <StarsIcon color="info" />
          <p className="job-detail__information__item__text">
            {job?.experienceLevel} Years
          </p>
        </div>
        <div className="job-detail__information__item">
          <PsychologyIcon color="info" />
          <p className="job-detail__information__item__locations-text">
            {job?.skills && job?.skills?.length <= 3
              ? job?.skills?.map((skill, index) =>
                  index !== job?.skills.length - 1 ? (
                    <>
                      <span>{skill}</span>
                      <Divider
                        light
                        orientation="vertical"
                        flexItem
                        sx={{
                          background: "black",
                          border: "1px solid black",
                        }}
                      />
                    </>
                  ) : (
                    <span>{skill}</span>
                  )
                )
              : job?.skills.slice(0, 3)?.map((skill, index) =>
                  index !== job?.skills.slice(0, 3).length - 1 ? (
                    <>
                      <span>{skill}</span>
                      <Divider
                        light
                        orientation="vertical"
                        flexItem
                        sx={{
                          background: "black",
                          border: "1px solid black",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <span>{skill}</span>
                      <span className="job-detail__information__item__text--grey">{`+ ${
                        job?.skills?.length - 3
                      } more`}</span>
                    </>
                  )
                )}
          </p>
        </div>
      </div>

      <div className="job-detail__actions">
        {applied === undefined ? (
          <CircularProgress style={{ width: "20px", height: "20px" }} />
        ) : applied ? (
          <Button
            disabled={applied}
            variant="contained"
            onClick={handleApply}
            endIcon={<DoneAllRoundedIcon color="success" />}
            sx={{
              fontWeight: "600",
              borderRadius: "50px",
              "&:disabled": {
                backgroundColor: "#c8e4fb",
              },
            }}
          >
            APPLIED
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleApply}
            endIcon={<AssignmentTurnedInRoundedIcon />}
            sx={{
              fontWeight: "600",
              borderRadius: "50px",
            }}
          >
            APPLY
          </Button>
        )}
        {saved === undefined ? (
          <CircularProgress style={{ width: "20px", height: "20px" }} />
        ) : saved ? (
          <Button
            onClick={handleSave}
            variant="contained"
            endIcon={<BookmarkAddedRoundedIcon color="action" />}
            sx={{ fontWeight: "600", borderRadius: "50px" }}
          >
            SAVED
          </Button>
        ) : (
          <Button
            onClick={handleSave}
            variant="contained"
            endIcon={<BookmarkAddIcon />}
            sx={{ fontWeight: "600", borderRadius: "50px" }}
          >
            SAVE
          </Button>
        )}
        {applied && (
          <p className="job-detail__actions__appliedDate">
            Applied {returnDateDifference(appliedDate)}
          </p>
        )}
      </div>

      {appliedStatus && (
        <div className="job-detail__status">
          <TrackStatus status={appliedStatus} />
        </div>
      )}

      <div className="job-detail__description">
        <p className="job-detail__description__heading">Job Description</p>
        <div className="job-detail__description__about">
          {job?.description?.about}
        </div>
        <div className="job-detail__description__lists">
          <p className="job-detail__description__subheading">
            Responsibilities
          </p>
          <ul className="job-detail__description__lists__list">
            {job?.description?.responsibilities?.map((item) => (
              <li className="job-detail__description__lists__list__item">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="job-detail__description__lists">
          <p className="job-detail__description__subheading">Requirements</p>
          <ul className="job-detail__description__lists__list">
            {job?.description?.requirements?.map((item) => (
              <li className="job-detail__description__lists__list__item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
