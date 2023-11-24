import "../Profile/Profile.scss";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import { Button, CircularProgress } from "@mui/material";

const FileUpload = ({
  resumeFilename,
  handleResumeChange,
  handleDownloadResume,
}) => {
  return (
    <div className="profile__form__resume-wrapper__resume">
      {resumeFilename ? (
        <p className="profile__form__resume-wrapper__resume__filename">
          <span className="profile__form__resume-wrapper__resume__filename__text">
            {resumeFilename.split(".")[0]}
          </span>
          <span>.pdf</span>
        </p>
      ) : (
        <CircularProgress
          style={{ width: "20px", height: "20px", marginLeft: "20px" }}
        />
      )}
      <div className="profile__form__resume-wrapper__resume__actions">
        <Button
          variant="contained"
          color="info"
          sx={{
            fontWeight: "600",
          }}
        >
          <label
            htmlFor="input-resume-file"
            className="profile__form__resume-wrapper__resume__label"
          >
            <CloudUploadRoundedIcon color="inherit" />
          </label>
        </Button>
        <input
          type="file"
          id="input-resume-file"
          name="resume"
          multiple={false}
          onChange={(e) => {
            handleResumeChange(e);
          }}
          className="profile__form__resume-wrapper__resume__input"
        />
        {resumeFilename && (
          <Button
            variant="outlined"
            color="info"
            title="Download Resume"
            onClick={handleDownloadResume}
          >
            <DownloadRoundedIcon color="inherit" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
