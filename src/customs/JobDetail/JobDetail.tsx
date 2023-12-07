import { useParams } from "react-router-dom";
import { JobProps } from "../Job/Job.model";
import { JobDetailProps } from "./JobDetail.model";
import { useState, useEffect, useMemo } from "react";
import { editJob, getJobByID, returnDateDifference } from "./utils";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import "./JobDetail.scss";
import {
  BookmarkCheck,
  BookmarkPlus,
  CheckCheck,
  ExternalLink,
  Loader2,
  PlusCircle,
} from "lucide-react";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import PsychologyIcon from "@mui/icons-material/Psychology";
import StarsIcon from "@mui/icons-material/Stars";
import RoomIcon from "@mui/icons-material/Room";
import { Button } from "@/components/ui/button";
import { Divider, CircularProgress, Chip } from "@mui/material";
import { getSavedJobs, removedSavedJob, saveJob } from "../Jobs/utils";
import { applyJob, getAppliedJobs } from "../../apis/applyJob";
import TrackStatus from "../TrackStatus/TrackStatus";
import { getFromStorage } from "@/utils/localStorage.utils";
import { EditableText } from "../EditableText/EditableText";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const JobDetail = ({ jobData }: JobDetailProps) => {
  const [job, setJob] = useState<JobProps | null>();
  const { id } = useParams();
  const user = getFromStorage("user");
  const userId = user?._id;
  const [saved, setSaved] = useState<boolean | undefined>();
  const [applied, setApplied] = useState<boolean | undefined>();
  const [appliedStatus, setJobStatus] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [chipText, setChipText] = useState("");
  const [locationText, setLocText] = useState("");
  const dateDifference = job?.datePosted
    ? returnDateDifference(job?.datePosted)
    : "NA";
  useEffect(() => {
    if (jobData) {
      setJob(jobData);
    } else if (id) {
      getJobByID(id).then((resp) => setJob(resp?.jobs));
    }
    getSavedJobs(userId).then((resp) => {
      if (resp?.jobs?.savedJobs?.includes(id)) {
        setSaved(true);
      } else {
        setSaved(false);
      }
    });

    getAppliedJobs(userId).then((resp) => {
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
  }, [id, job?._id, jobData, userId]);

  const appliedDiffResult = useMemo(
    () => returnDateDifference(appliedDate),
    [appliedDate]
  );

  const handleSave = async () => {
    const args = id ? id : jobData?._id ? jobData?._id : "";

    if (!saved) {
      const response = await saveJob(args, userId);
      if (response?.code === 200) {
        setSaved(true);
      }
    } else {
      const response = await removedSavedJob(args, userId);
      if (response?.code === 200) {
        setSaved(false);
      }
    }
  };

  const handleApply = async () => {
    if (job?._id) {
      const response = await applyJob(job._id, userId);
      if (response?.code === 200) {
        setApplied(true);
      }
    }
  };

  const handleEditJob = async (value, field) => {
    const payload = { ...job };
    payload[field] = value;
    await editJob?.(payload, userId);
  };

  const handleSkillAdd = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    const inputValue: string = (event?.target as HTMLInputElement)?.value;
    if (event.key === "Enter" && event.keyCode === 13) {
      if (inputValue && job) {
        const skillsToAdd = inputValue.split(",").filter((item) => {
          if (item) {
            return item.trim();
          }
        });
        const currentSkills = [...job.skills];
        const skills = [...currentSkills, ...skillsToAdd];
        setJob({ ...job, skills });
        await handleEditJob(skills, "skills");
      }
    }
  };

  const deleteSkillItem = async (index) => {
    if (job) {
      const skills = job.skills.filter((_item, idx) => idx !== index);
      setJob({ ...job, skills });
      await handleEditJob(skills, "skills");
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
              <EditableText
                userRole={user?.role}
                field="jobRole"
                initialText={job?.jobRole}
                onBlur={handleEditJob}
              />
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
              <EditableText
                userRole={user?.role}
                field="ctc"
                initialText={job?.ctc}
                onBlur={handleEditJob}
              />
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
              <EditableText
                userRole={user?.role}
                field="workingMode"
                initialText={job?.workingMode}
                onBlur={handleEditJob}
              />
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
            <EditableText
              userRole={user?.role}
              field="experienceLevel"
              initialText={job?.experienceLevel}
              onBlur={handleEditJob}
            />{" "}
            Years
          </p>
        </div>
        <div className="job-detail__information__item">
          <PsychologyIcon color="info" />
          <p className="job-detail__information__item__locations-text">
            {job?.skills &&
              job?.skills?.map((skill, index) => (
                <Chip
                  onDelete={() => deleteSkillItem(index)}
                  deleteIcon={<RemoveIcon color="error" />}
                  sx={{
                    fontFamily: "var(--rubik-regular)",
                    backgroundColor: "#cff3ff",
                    color: "#042d4d",
                    letterSpacing: "0.3px",
                  }}
                  label={skill}
                  key={`${skill}-${index}`}
                />
              ))}
            {user?.role === "recruiter" && (
              <Popover>
                <PopoverTrigger>
                  <Button variant="ghost">
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Label htmlFor="add-skill">
                    Enter comma separated values
                  </Label>
                  <Input
                    id="add-skill"
                    placeholder="Add skill..."
                    value={chipText}
                    onChange={(e) => setChipText(e.target.value)}
                    onKeyDown={handleSkillAdd}
                  />
                </PopoverContent>
              </Popover>
            )}
          </p>
        </div>
      </div>

      {user?.role === "employee" ? (
        <div className="job-detail__actions">
          {applied === undefined ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          ) : applied ? (
            <Button
              variant="secondary"
              disabled={applied}
              onClick={handleApply}
            >
              APPLIED <CheckCheck className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Button onClick={handleApply}>
              APPLY <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          )}
          {saved === undefined ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          ) : saved ? (
            <Button onClick={handleSave}>
              SAVED <BookmarkCheck className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Button onClick={handleSave}>
              SAVE <BookmarkPlus className="ml-2 h-5 w-5" />
            </Button>
          )}
          {applied && (
            <p className="job-detail__actions__appliedDate">
              Applied {appliedDiffResult}
            </p>
          )}
        </div>
      ) : (
        <div className="job-detail__actions">
          <Button variant="outline">Edit</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      )}

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
