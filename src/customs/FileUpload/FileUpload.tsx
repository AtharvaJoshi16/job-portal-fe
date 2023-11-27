import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import { Button, CircularProgress } from "@mui/material";
import "./FileUpload.scss";
const FileUpload = ({
  headingLabel,
  resumeFilename,
  handleResumeChange,
  handleDownloadResume,
  warningText,
  uploadStatus = false,
}) => {
  return (
    <div className="file-upload">
      <p className="file-upload__heading">{headingLabel}</p>
      <div className="file-upload__resume">
        {resumeFilename ? (
          <p className="file-upload__resume__filename">
            <span className="file-upload__resume__filename__text">
              {resumeFilename.split(".")[0]}
            </span>
            <span>.pdf</span>
          </p>
        ) : (
          <CircularProgress
            style={{ width: "20px", height: "20px", marginLeft: "20px" }}
          />
        )}
        <div className="file-upload__resume__actions">
          <Button
            variant="contained"
            color="info"
            sx={{
              fontWeight: "600",
            }}
          >
            <label
              htmlFor="input-resume-file"
              className="file-upload__resume__label"
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
            className="file-upload__resume__input"
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
      {warningText && <p className="file-upload__warning">{warningText}</p>}
      {uploadStatus && <p className="file-upload__uploaded">File Uploaded!</p>}
    </div>
  );
};

export default FileUpload;
