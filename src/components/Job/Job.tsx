import { AppliedJobs, JobProps } from "./Job.model";
import RoomIcon from "@mui/icons-material/Room";
import PaidIcon from "@mui/icons-material/Paid";
import StarsIcon from "@mui/icons-material/Stars";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import NearMeRoundedIcon from "@mui/icons-material/NearMeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import "./Job.scss";
import {
  IconButton,
  Modal,
  Box,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { returnDateDifference } from "../JobDetail/utils";
import FileUpload from "../FileUpload/FileUpload";
import { getResumeFileName, saveResume } from "../Profile/utils";
import { applyJob } from "../../apis/applyJob";
import { getFromStorage } from "@/utils/localStorage.utils";
// import { Comments } from "..";

const Job = ({
  _id,
  jobRole,
  openings,
  variant = "default",
  experienceLevel,
  skills,
  applications,
  ctc,
  datePosted,
  locations,
  organization,
  organizationLogo,
  onSaveJob,
  onRemoveSavedJob,
  bookmarks,
  appliedJobs,
  workingMode,
}: JobProps) => {
  const navigate = useNavigate();
  const [bookmarked, setBookmark] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const dateDiff = datePosted ? returnDateDifference(datePosted) : null;
  const [warningText, setWarningText] = useState("");
  const [uploaded, setUploaded] = useState<boolean | undefined>();
  const [resumeFilename, setResumeFilename] = useState("");
  const [applied, setApplied] = useState<boolean | undefined>();
  const [appliedJob, setAppliedJob] = useState<AppliedJobs>();

  const userId = getFromStorage("user")?._id;

  const setData = useCallback(async () => {
    if (resumeModalOpen) {
      const userResume = await getResumeFileName(userId);
      if (userResume?.filename) {
        setResumeFilename(userResume?.filename);
      } else {
        setResumeFilename("No File Chosen");
      }
    }
  }, [resumeModalOpen, userId]);

  useEffect(() => {
    const job = appliedJobs?.find((j) => j._id === _id);
    setAppliedJob(job);
    if (bookmarks?.includes(_id)) {
      setBookmark(true);
    } else {
      setBookmark(false);
    }
    if (job) {
      setApplied(true);
    } else {
      setApplied(false);
    }
    setData();
  }, [_id, bookmarks, appliedJobs, setData]);

  const handleComments = () => {
    setShowComments(!showComments);
  };

  const handleBookmark = () => {
    if (!bookmarked) {
      onSaveJob?.(_id, userId);
    } else {
      onRemoveSavedJob?.(_id, userId);
    }
    setBookmark(!bookmarked);
  };

  const onDownloadResume = () => {
    window.location.href = `http://localhost:8080/api/v1/get-resume?userId=${userId}&download=true`;
  };

  const onResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      const splitArray = e.target?.files?.[0]?.name.split(".");
      const ext = splitArray[splitArray.length - 1];
      if (ext !== "pdf") {
        setWarningText("Only PDF files allowed");
      } else {
        setResumeFilename(e.target?.files?.[0]?.name);
        setWarningText("");
        const formdata = new FormData();
        if (e.target?.files?.[0]) {
          formdata.append("resume", e.target?.files?.[0]);
          const response = await saveResume(formdata, userId);
          if (response?.code === 200) {
            setUploaded(true);
          } else {
            setUploaded(false);
          }
        }
      }
    }
  };

  const handleApply = async () => {
    const response = await applyJob(_id, userId);
    if (response?.code === 200) {
      setApplied(true);
    }
  };

  return (
    <div className="job">
      <div className="job__upper">
        <div className="job__upper__logo-role-wrapper">
          <img
            src={
              organizationLogo
                ? organizationLogo
                : "/assets/organizationLogoPlaceholder.png"
            }
            alt="organization-logo"
            className="job__upper__logo-role-wrapper__logo"
          />
          <div className="job__upper__logo-role-wrapper__role">
            <p className="job__upper__logo-role-wrapper__role__text">
              {jobRole}
            </p>
            <p className="job__upper__logo-role-wrapper__role__org-text">
              {organization}
            </p>
          </div>
        </div>
        <div className="job__upper__job-details">
          <div className="job__upper__job-details__locations">
            <RoomIcon color="info" />
            <div className="job__upper__job-details__locations__wrapper">
              {locations?.length <= 3
                ? locations?.map((loc, index) =>
                    index !== locations.length - 1 ? (
                      <span className="job__upper__job-details__locations__text">
                        {loc},{" "}
                      </span>
                    ) : (
                      <span className="job__upper__job-details__locations__text">
                        {loc}
                      </span>
                    )
                  )
                : locations
                    .slice(0, 3)
                    ?.map((loc, index) =>
                      index !== locations.slice(0, 3).length - 1 ? (
                        <span className="job__upper__job-details__locations__text">
                          {loc},{" "}
                        </span>
                      ) : (
                        <span className="job__upper__job-details__locations__text">
                          {`${loc} + ${locations?.length - 3} more`}
                        </span>
                      )
                    )}
            </div>
          </div>
          <div className="job__upper__job-details__locations">
            <PaidIcon color="info" />
            <p className="job__upper__job-details__locations__text">
              {ctc ? ctc : "Not Disclosed"}
            </p>
          </div>
          <div className="job__upper__job-details__locations">
            <StarsIcon color="info" />
            <p className="job__upper__job-details__locations__text">
              {experienceLevel} Years
            </p>
          </div>
          <div className="job__upper__job-details__locations">
            <MapsHomeWorkIcon color="info" />
            <p className="job__upper__job-details__locations__text">
              {workingMode}
            </p>
          </div>
        </div>
        <div className="job__upper__chips">
          {skills?.map((skill) => (
            <Chip
              sx={{
                fontFamily: "var(--rubik-regular)",
              }}
              label={skill}
              size="small"
            />
          ))}
        </div>
      </div>
      <div className="job__lower">
        <div className="job__lower__date-posted">
          {variant === "default" || !appliedJob ? (
            <>
              <p className=" job__lower__date-posted__text job__lower__date-posted__text__openings">
                {openings} openings
              </p>
              <p className="job__lower__date-posted__text">Posted {dateDiff}</p>
              <p className="job__lower__date-posted__text">
                Applicants: {applications}
              </p>
            </>
          ) : (
            <>
              <p className="job__lower__date-posted__text">
                Applied {returnDateDifference(appliedJob.appliedDate!)}
              </p>
              <Chip
                className="job__lower__chip"
                sx={{
                  marginTop: "5px",
                  backgroundColor: "#cff3ff",
                  color: "#042d4d",
                  letterSpacing: "0.3px",
                  textTransform: "capitalize",
                  fontFamily: "var(--rubik-regular)",
                }}
                label={appliedJob?.applicationStatus}
                size="small"
              />
            </>
          )}
        </div>
        <div className="job__lower__actions">
          <div className="job__lower__actions__left">
            <IconButton size="small" onClick={handleComments}>
              {showComments ? (
                <ModeCommentRoundedIcon fontSize="small" />
              ) : (
                <ModeCommentOutlinedIcon fontSize="small" />
              )}
            </IconButton>
            {/* {showComments && (
              <div className="job__lower__actions__comments">
                <Comments comments={comments} />
              </div>
            )} */}
            <IconButton size="small" onClick={handleBookmark}>
              {bookmarked ? (
                <BookmarkRoundedIcon fontSize="small" />
              ) : (
                <BookmarkBorderRoundedIcon fontSize="small" />
              )}
            </IconButton>
          </div>
          <div className="job__lower__actions__right">
            <IconButton
              disabled={applied}
              onClick={() => setResumeModalOpen(true)}
              title="Apply"
              size="large"
              color="info"
            >
              {applied === undefined ? (
                <CircularProgress style={{ width: "20px", height: "20px" }} />
              ) : !applied ? (
                <NearMeRoundedIcon fontSize="inherit" />
              ) : (
                <DoneAllRoundedIcon fontSize="inherit" color="success" />
              )}
            </IconButton>
            {
              <Modal
                onClose={() => setResumeModalOpen(false)}
                open={resumeModalOpen}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    bgcolor: "background.paper", // Change to whatever color you want
                    border: "2px solid #9f9f9f",
                    borderRadius: "8px",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <FileUpload
                    uploadStatus={uploaded}
                    warningText={warningText}
                    headingLabel="Confirm Resume"
                    resumeFilename={resumeFilename}
                    handleDownloadResume={onDownloadResume}
                    handleResumeChange={(e) => onResumeChange(e)}
                  />
                  <Button
                    disabled={applied}
                    variant="contained"
                    sx={{
                      fontWeight: 600,
                    }}
                    className="job__modal__apply"
                    onClick={handleApply}
                  >
                    Apply
                  </Button>
                </Box>
              </Modal>
            }
            <IconButton
              title="Go To Job"
              size="large"
              color="info"
              onClick={() => navigate(`/jobs/${_id}`)}
            >
              <ArrowForwardRoundedIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
