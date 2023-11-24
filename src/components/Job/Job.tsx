import { JobProps } from "./Job.model";
import RoomIcon from "@mui/icons-material/Room";
import PaidIcon from "@mui/icons-material/Paid";
import StarsIcon from "@mui/icons-material/Stars";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import NearMeRoundedIcon from "@mui/icons-material/NearMeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import "./Job.scss";
import { IconButton, Modal, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Comments } from "..";
import { useNavigate } from "react-router";
import { returnDateDifference } from "../JobDetail/utils";
import FileUpload from "../FileUpload/FileUpload";

const Job = ({
  _id,
  jobRole,
  experienceLevel,
  description,
  applications,
  ctc,
  comments,
  datePosted,
  locations,
  organization,
  organizationLogo,
  onSaveJob,
  onRemoveSavedJob,
  bookmarks,
  workingMode,
}: JobProps) => {
  const navigate = useNavigate();
  const [bookmarked, setBookmark] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const dateDiff = returnDateDifference(datePosted);

  useEffect(() => {
    if (bookmarks.includes(_id)) {
      setBookmark(true);
    } else {
      setBookmark(false);
    }
  }, [_id, bookmarks]);

  const handleComments = () => {
    setShowComments(!showComments);
  };

  const handleBookmark = () => {
    if (!bookmarked) {
      onSaveJob?.(_id);
    } else {
      onRemoveSavedJob?.(_id);
    }
    setBookmark(!bookmarked);
  };

  return (
    <div className="job">
      <div className="job__logo-role-wrapper">
        <img
          src={
            organizationLogo
              ? organizationLogo
              : "/assets/organizationLogoPlaceholder.png"
          }
          alt="organization-logo"
          className="job__logo-role-wrapper__logo"
        />
        <div className="job__logo-role-wrapper__role">
          <p className="job__logo-role-wrapper__role__text">{jobRole}</p>
          <p className="job__logo-role-wrapper__role__org-text">
            {organization}
          </p>
        </div>
      </div>
      <div className="job__job-details">
        <div className="job__job-details__locations">
          <RoomIcon color="info" />
          <div className="job__job-details__locations__wrapper">
            {locations?.length <= 3
              ? locations?.map((loc, index) =>
                  index !== locations.length - 1 ? (
                    <span className="job__job-details__locations__text">
                      {loc},{" "}
                    </span>
                  ) : (
                    <span className="job__job-details__locations__text">
                      {loc}
                    </span>
                  )
                )
              : locations
                  .slice(0, 3)
                  ?.map((loc, index) =>
                    index !== locations.slice(0, 3).length - 1 ? (
                      <span className="job__job-details__locations__text">
                        {loc},{" "}
                      </span>
                    ) : (
                      <span className="job__job-details__locations__text">
                        {`${loc} + ${locations?.length - 3} more`}
                      </span>
                    )
                  )}
          </div>
        </div>
        <div className="job__job-details__locations">
          <PaidIcon color="info" />
          <p className="job__job-details__locations__text">
            {ctc ? ctc : "Not Disclosed"}
          </p>
        </div>
        <div className="job__job-details__locations">
          <StarsIcon color="info" />
          <p className="job__job-details__locations__text">
            {experienceLevel} Years
          </p>
        </div>
        <div className="job__job-details__locations">
          <MapsHomeWorkIcon color="info" />
          <p className="job__job-details__locations__text">{workingMode}</p>
        </div>
      </div>
      {description?.about && (
        <div className="job__about">
          <p className="job__about__text">{description?.about}</p>
        </div>
      )}
      <div className="job__date-posted">
        <p className="job__date-posted__text">Posted {dateDiff}</p>
        <p className="job__date-posted__text">Applicants: {applications}</p>
      </div>
      <div className="job__actions">
        <div className="job__actions__left">
          <IconButton size="small" onClick={handleComments}>
            {showComments ? (
              <ModeCommentRoundedIcon fontSize="small" />
            ) : (
              <ModeCommentOutlinedIcon fontSize="small" />
            )}
          </IconButton>
          {showComments && (
            <div className="job__actions__comments">
              <Comments comments={comments} />
            </div>
          )}
          <IconButton size="small" onClick={handleBookmark}>
            {bookmarked ? (
              <BookmarkRoundedIcon fontSize="small" />
            ) : (
              <BookmarkBorderRoundedIcon fontSize="small" />
            )}
          </IconButton>
        </div>
        <div className="job__actions__right">
          <IconButton
            onClick={() => setResumeModalOpen(true)}
            title="Apply"
            size="large"
            color="info"
          >
            <NearMeRoundedIcon fontSize="inherit" />
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
                <p className="job__modal__heading">Confirm Resume</p>
                <FileUpload
                  resumeFilename="Dummy Filename.pdf"
                  handleDownloadResume={() => {}}
                  handleResumeChange={() => {}}
                />
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
  );
};

export default Job;
