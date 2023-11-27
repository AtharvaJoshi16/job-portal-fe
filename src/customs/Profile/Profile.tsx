/* eslint-disable @typescript-eslint/no-unused-vars */
import { useFormik } from "formik";
import {
  Certifications,
  Experience,
  ProfileProps,
  SkillLevel,
  Skills,
  UserProfileData,
} from "./Profile.model";
import { Alert, AlertColor, AlertTitle, CircularProgress } from "@mui/material";
import { Modal } from "@mui/material";
import "./Profile.scss";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap";
import { IconButton } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import {
  getProfile,
  getProfileImage,
  getResumeFileName,
  saveProfileImage,
  saveResume,
} from "./utils";
import { profileSchema } from "./validation";
import { useNavigate, useParams } from "react-router";
import "react-image-crop/src/ReactCrop.scss";
import ReactCrop, { Crop } from "react-image-crop";
import { ProfileImageResponse } from "../types/ApiResponse";
import FileUpload from "../FileUpload/FileUpload";

const Profile = ({ onEdit }: ProfileProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState<string | null>("+91");
  const countryCodes = ["+91", "+37", "+61", "+89", "+72"];
  const formik = useFormik({
    initialValues: {
      gender: "",
      dateOfBirth: "",
      yoe: 0,
      phoneNumber: "",
      currentEmployer: "",
      jobRole: "",
      education: {
        secondary: {
          school: "",
          score: 0,
        },
        higherSecondary: {
          school: "",
          score: 0,
        },
        graduation: {
          university: "",
          college: "",
          score: 0,
          stream: "",
        },
      },
      location: "",
      githubUrl: "",
      twitterUrl: "",
    },
    onSubmit: async (values) => {
      const obj: UserProfileData = values;
      obj.skills = skillsArray;
      obj.certifications = certifications;
      obj.experience = experience;
      const response = await onEdit?.(obj);
      const formdata = new FormData();
      if (profileImageObject) {
        formdata.append("profileImage", profileImageObject);
        await saveProfileImage(formdata);
      }
      if (response?.code === 200) {
        setAlert({
          message: "Profile Updated!",
          variant: "success",
        });
        setVisibility(true);
      }
    },
  });

  const [skillsArray, setSkills] = useState<Skills[]>([]);
  const [certifications, setCertifications] = useState<Certifications[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [validationErrors, setErrors] = useState("");
  const [alertMessage, setAlert] = useState({ message: "", variant: "" });
  const [visibility, setVisibility] = useState(false);
  const [profileImage, setImage] = useState("");
  const [resumeFilename, setResumeFilename] = useState("");
  const [resumeWarning, setResumeWarning] = useState("");
  const [profileImageObject, setProfileObject] = useState<File | null>();
  const [profileImageResponse, setImageResponse] =
    useState<ProfileImageResponse>();
  const [crop, setCrop] = useState<Crop>();
  const [modalOpen, setOpen] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    async function getProfileApi() {
      if (id) {
        const response = await getProfile(id);
        if (response?.profile) {
          formik.setValues(response?.profile);
          setSkills(response?.profile?.skills);
          setCertifications(response?.profile?.certifications);
          setExperience(response?.profile?.experience);
        }
        const profileImageResponse = await getProfileImage();
        setImageResponse(profileImageResponse);
        localStorage.setItem("userProfileImage", profileImageResponse.url);
        const userResume = await getResumeFileName();
        if (userResume?.filename) {
          setResumeFilename(userResume?.filename);
        } else {
          setResumeFilename("No File Chosen");
        }
      } else {
        alert("Please login!");
        navigate("/login");
      }
    }
    getProfileApi();
  }, []);

  useEffect(() => {
    (async () => {
      const obj: UserProfileData = formik.values;
      obj.skills = skillsArray;
      obj.certifications = certifications;
      obj.experience = experience;
      const errors = await profileSchema
        .validate(obj)
        .then(() => setErrors(""))
        .catch((err) => err?.message);
      setErrors(errors);
      setVisibility(true);
    })();
  }, [formik.values, certifications, skillsArray, experience]);

  const handleSkillNameChange = (name: string, index: number) => {
    const obj = skillsArray;
    obj[index].name = name;
    setSkills([...obj]);
  };

  const handleSkillLevelChange = (level: string | null, index: number) => {
    const obj = skillsArray;
    obj[index].level = level as SkillLevel;
    setSkills([...obj]);
  };

  const handleCertNameChange = (name: string, index: number) => {
    const obj = certifications;
    obj[index].name = name;
    setCertifications([...obj]);
  };

  const handleCertDescriptionChange = (description: string, index: number) => {
    const obj = certifications;
    obj[index].description = description;
    setCertifications([...obj]);
  };

  const handleEmployerChange = (employer: string, index: number) => {
    const obj = experience;
    obj[index].employer = employer;
    setExperience([...obj]);
  };

  const handleRoleChange = (role: string, index: number) => {
    const obj = experience;
    obj[index].role = role;
    setExperience([...obj]);
  };

  const handleFromChange = (from: string, index: number) => {
    const obj = experience;
    obj[index].from = from;
    setExperience([...obj]);
  };

  const handleToChange = (to: string, index: number) => {
    const obj = experience;
    obj[index].to = to;
    setExperience([...obj]);
  };

  const handleFormSave = async () => {
    const obj: UserProfileData = formik.values;
    obj.skills = skillsArray;
    obj.certifications = certifications;
    obj.experience = experience;
    if (await profileSchema.isValid(obj)) {
      formik.submitForm();
      setDisabled(true);
    }
  };

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      setImage(URL.createObjectURL(e.target?.files?.[0]));
      setProfileObject(e.target?.files?.[0]);
    }
  };

  const retrieveProfileImage = () => {
    if (profileImage?.length) {
      return profileImage;
    }

    if (profileImageResponse?.code === 400) {
      return "/assets/dummy_profile_img.png";
    }
    if (profileImageResponse?.url) {
      return profileImageResponse?.url;
    }
  };

  const handleResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      const splitArray = e.target?.files?.[0]?.name.split(".");
      const ext = splitArray[splitArray.length - 1];
      if (ext !== "pdf") {
        setResumeWarning("Only PDF files allowed");
      } else {
        setResumeFilename(e.target?.files?.[0]?.name);
        setResumeWarning("");
        const formdata = new FormData();
        if (e.target?.files?.[0]) {
          formdata.append("resume", e.target?.files?.[0]);
          const response = await saveResume(formdata);
          if (response?.code === 200) {
            setAlert({ message: response?.message, variant: "success" });
            setVisibility(true);
          } else {
            setAlert({
              message: "Failed to upload resume",
              variant: "error",
            });
            setVisibility(true);
          }
        }
      }
    }
  };

  const handleDownloadResume = async () => {
    window.location.href = `http://localhost:8080/api/v1/get-resume?userId=${id}&download=true`;
  };

  return (
    <>
      {validationErrors && visibility && (
        <Alert
          severity="error"
          className="profile__alert"
          action={
            <IconButton
              onClick={() => setVisibility(false)}
              color="inherit"
              size="small"
            >
              <CloseRoundedIcon />
            </IconButton>
          }
        >
          <AlertTitle>Error</AlertTitle>
          {validationErrors}
        </Alert>
      )}
      {alertMessage?.message && visibility && (
        <Alert
          severity={alertMessage?.variant as AlertColor}
          className="profile__alert"
          action={
            <IconButton
              onClick={() => setVisibility(false)}
              color="inherit"
              size="small"
            >
              <CloseRoundedIcon />
            </IconButton>
          }
        >
          <AlertTitle>Success</AlertTitle>
          {alertMessage?.message}
        </Alert>
      )}
      <div className="profile">
        <div className="profile__header">YOUR PROFILE</div>
        <div className="profile__header profile__header__edit">
          <IconButton
            className="profile__header__edit__btn"
            onClick={() => setDisabled(false)}
          >
            <EditRoundedIcon color="info" />
          </IconButton>
          <IconButton
            type="submit"
            onClick={handleFormSave}
            className="profile__header__edit__btn"
          >
            <TaskAltRoundedIcon color="success" />
          </IconButton>
        </div>
        <Form
          className="profile__form"
          id="profile-form"
          encType="multipart/form-data"
        >
          <div className="profile__form__image-section">
            {profileImage || profileImageResponse?.url ? (
              <img
                ref={imageRef}
                onClick={() => {
                  setOpen(true);
                }}
                src={retrieveProfileImage()}
                alt="user-profile"
                className="profile__form__image-section__image"
              />
            ) : (
              <CircularProgress />
            )}
            {modalOpen && (
              <Modal open={modalOpen} onClose={() => setOpen(false)}>
                <div className="profile__form__image-section__modal">
                  <ReactCrop
                    className="profile__form__image-section__modal__crop"
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                  >
                    <img
                      src={retrieveProfileImage()}
                      alt="user-profile"
                      className="profile__form__image-section__crop-view"
                    />
                  </ReactCrop>
                </div>
              </Modal>
            )}
            <label
              htmlFor="input-file"
              className="profile__form__image-section__label"
            >
              <AddCircleRoundedIcon color="primary" />
            </label>
            <input
              type="file"
              id="input-file"
              name="profileImage"
              multiple={false}
              onChange={(e) => handleProfileImage(e)}
              className="profile__form__image-section__input"
            />
          </div>
          {resumeFilename ? (
            <div className="profile__form__resume-wrapper">
              <FileUpload
                headingLabel="Resume"
                warningText={resumeWarning}
                resumeFilename={resumeFilename}
                handleResumeChange={handleResumeChange}
                handleDownloadResume={handleDownloadResume}
              />
            </div>
          ) : (
            <CircularProgress
              sx={{ width: "40px", height: "40px", margin: "auto" }}
            />
          )}
          <Form.Group className="profile__form__group">
            <Form.Label className="profile__form__group__label">
              Gender
            </Form.Label>
            <div className="profile__form__group__radios">
              <Form.Check
                disabled={isDisabled}
                inline
                type="radio"
                id="gender"
                name="gender"
                label="Male"
                value="Male"
                checked={formik.values.gender === "Male"}
                onChange={formik.handleChange}
              />
              <Form.Check
                disabled={isDisabled}
                inline
                type="radio"
                id="gender"
                name="gender"
                label="Female"
                value="Female"
                checked={formik.values.gender === "Female"}
                onChange={formik.handleChange}
              />
            </div>
          </Form.Group>
          <Form.Group className="profile__form__group">
            <Form.Label className="profile__form__group__label">
              Date Of Birth
            </Form.Label>
            <Form.Control
              disabled={isDisabled}
              size="sm"
              className="profile__form__group__date"
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group className="profile__form__group">
            <Form.Label className="profile__form__group__label">
              Contact No.
            </Form.Label>
            <InputGroup>
              <DropdownButton
                disabled={isDisabled}
                size="sm"
                variant="outline-secondary"
                title={countryCode}
                id="input-group-dropdown-1"
                onSelect={(e) => {
                  setCountryCode(e);
                }}
              >
                {countryCodes.map((code) => {
                  return <Dropdown.Item eventKey={code}>{code}</Dropdown.Item>;
                })}
              </DropdownButton>
              <Form.Control
                disabled={isDisabled}
                size="sm"
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="profile__form__group">
            <Form.Label className="profile__form__group__label">
              Experience (in Years)
            </Form.Label>
            <Form.Control
              disabled={isDisabled}
              size="sm"
              type="number"
              id="yoe"
              name="yoe"
              value={formik.values.yoe}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group className="profile__form__group">
            <Form.Label className="profile__form__group__label">
              Current Employer
            </Form.Label>
            <Form.Control
              disabled={isDisabled}
              size="sm"
              type="text"
              id="currentEmployer"
              name="currentEmployer"
              value={formik.values.currentEmployer}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group className="profile__form__group">
            <Form.Label className="profile__form__group__label">
              Job Role
            </Form.Label>
            <Form.Control
              disabled={isDisabled}
              size="sm"
              type="text"
              id="jobRole"
              name="jobRole"
              value={formik.values.jobRole}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <div className="profile__form__section">
            <p className="profile__form__section__heading">EDUCATION</p>
            <p className="profile__form__section__subheading">SECONDARY</p>
            <Form.Group className="profile__form__section__fields">
              <Form.Label className="profile__form__group__label">
                School
              </Form.Label>
              <Form.Control
                disabled={isDisabled}
                size="sm"
                id="education.secondary.school"
                name="education.secondary.school"
                value={formik.values.education.secondary.school}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Form.Group className="profile__form__section__fields">
              <Form.Label className="profile__form__group__label">
                Score
              </Form.Label>
              <Form.Control
                disabled={isDisabled}
                size="sm"
                id="education.secondary.score"
                name="education.secondary.score"
                value={formik.values.education.secondary.score}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <p className="profile__form__section__subheading">
              HIGHER SECONDARY
            </p>
            <Form.Group className="profile__form__section__fields">
              <Form.Label className="profile__form__group__label">
                School
              </Form.Label>
              <Form.Control
                disabled={isDisabled}
                size="sm"
                id="education.higherSecondary.school"
                name="education.higherSecondary.school"
                value={formik.values.education.higherSecondary.school}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Form.Group className="profile__form__section__fields">
              <Form.Label className="profile__form__group__label">
                Score
              </Form.Label>
              <Form.Control
                disabled={isDisabled}
                size="sm"
                id="education.higherSecondary.score"
                name="education.higherSecondary.score"
                value={formik.values.education.higherSecondary.score}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <p className="profile__form__section__subheading">GRADUATION</p>
            <Form.Group className="profile__form__section__fields">
              <Form.Label className="profile__form__group__label">
                University
              </Form.Label>
              <Form.Control
                disabled={isDisabled}
                size="sm"
                id="education.graduation.university"
                name="education.graduation.university"
                value={formik.values.education.graduation.university}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Form.Group className="profile__form__section__fields">
              <Form.Label className="profile__form__group__label">
                College
              </Form.Label>
              <Form.Control
                disabled={isDisabled}
                size="sm"
                id="education.graduation.college"
                name="education.graduation.college"
                value={formik.values.education.graduation.college}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Form.Group className="profile__form__section__fields">
              <Form.Label className="profile__form__group__label">
                Stream
              </Form.Label>
              <Form.Control
                disabled={isDisabled}
                size="sm"
                id="education.graduation.stream"
                name="education.graduation.stream"
                value={formik.values.education.graduation.stream}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Form.Group className="profile__form__section__fields">
              <Form.Label className="profile__form__group__label">
                Score
              </Form.Label>
              <Form.Control
                disabled={isDisabled}
                size="sm"
                id="education.graduation.score"
                name="education.graduation.score"
                value={formik.values.education.graduation.score}
                onChange={formik.handleChange}
              />
            </Form.Group>
          </div>
          <div className="profile__form__section">
            <div className="profile__form__section__skills">
              <p className="profile__form__section__heading">SKILLS</p>
              <IconButton
                disabled={isDisabled}
                type="button"
                onClick={() =>
                  setSkills((skills) => [
                    ...skills,
                    { name: "", level: SkillLevel.BASIC },
                  ])
                }
              >
                <AddCircleOutlineRoundedIcon />
              </IconButton>
            </div>
            <div className="profile__form__section__skills__fields">
              {skillsArray?.map((skill, index) => (
                <div className="profile__form__section__skills__fields__inner">
                  <Form.Control
                    disabled={isDisabled}
                    size="sm"
                    id={`skill-name-${index}`}
                    name={`skill-name-${index}`}
                    value={skill?.name}
                    onChange={(e) =>
                      handleSkillNameChange(e.target.value, index)
                    }
                  />
                  <DropdownButton
                    disabled={isDisabled}
                    title={skill?.level}
                    variant="secondary"
                    onSelect={(e) => handleSkillLevelChange(e, index)}
                    size="sm"
                  >
                    {(Object.keys(SkillLevel) as Array<SkillLevel>).map(
                      (level, _index) => (
                        <Dropdown.Item eventKey={level}>{level}</Dropdown.Item>
                      )
                    )}
                  </DropdownButton>
                  <IconButton
                    disabled={isDisabled}
                    type="button"
                    onClick={() =>
                      setSkills((skills) =>
                        skills.filter((_s, idx) => idx !== index)
                      )
                    }
                  >
                    <RemoveCircleOutlineRoundedIcon />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>
          <div className="profile__form__section">
            <div className="profile__form__section__experience">
              <p className="profile__form__section__heading">EXPERIENCE</p>
              <IconButton
                disabled={isDisabled}
                type="button"
                onClick={() =>
                  setExperience((exp) => [
                    ...exp,
                    { employer: "", role: "", from: "", to: "" },
                  ])
                }
              >
                <AddCircleOutlineRoundedIcon />
              </IconButton>
            </div>
            <div className="profile__form__section__experience__fields">
              {experience?.map((exp, index) => (
                <div className="profile__form__section__experience__wrapper">
                  <div className="profile__form__section__experience__fields__inner">
                    <Form.Group className="profile__form__section__experience__group">
                      <Form.Label className="profile__form__group__label profile__form__section__experience__group__label">
                        Employer
                      </Form.Label>
                      <Form.Control
                        disabled={isDisabled}
                        size="sm"
                        id={`exp-employer-${index}`}
                        name={`exp-employer-${index}`}
                        value={exp?.employer}
                        onChange={(e) =>
                          handleEmployerChange(e.target.value, index)
                        }
                      />
                    </Form.Group>
                    <Form.Group className="profile__form__section__experience__group">
                      <Form.Label className="profile__form__group__label profile__form__section__experience__group__label">
                        Role
                      </Form.Label>
                      <Form.Control
                        disabled={isDisabled}
                        size="sm"
                        id={`exp-role-${index}`}
                        name={`exp-role-${index}`}
                        value={exp?.role}
                        onChange={(e) =>
                          handleRoleChange(e.target.value, index)
                        }
                      />
                    </Form.Group>
                    <div className="profile__form__section__experience__dates">
                      <Form.Group className="profile__form__section__experience__group">
                        <Form.Label className="profile__form__group__label profile__form__section__experience__group__label">
                          From
                        </Form.Label>
                        <Form.Control
                          disabled={isDisabled}
                          size="sm"
                          id={`exp-from-${index}`}
                          name={`exp-from-${index}`}
                          value={exp?.from}
                          onChange={(e) =>
                            handleFromChange(e.target.value, index)
                          }
                        />
                      </Form.Group>
                      <Form.Group className="profile__form__section__experience__group">
                        <Form.Label className="profile__form__group__label profile__form__section__experience__group__label">
                          To
                        </Form.Label>
                        <Form.Control
                          disabled={isDisabled}
                          size="sm"
                          id={`exp-to-${index}`}
                          name={`exp-to-${index}`}
                          value={exp?.to}
                          onChange={(e) =>
                            handleToChange(e.target.value, index)
                          }
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <IconButton
                    disabled={isDisabled}
                    type="button"
                    onClick={() =>
                      setExperience((exp) =>
                        exp.filter((_s, idx) => idx !== index)
                      )
                    }
                  >
                    <RemoveCircleOutlineRoundedIcon />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>
          <div className="profile__form__section">
            <div className="profile__form__section__certifications">
              <p className="profile__form__section__heading">CERTIFICATIONS</p>
              <IconButton
                disabled={isDisabled}
                type="button"
                onClick={() =>
                  setCertifications((certs) => [
                    ...certs,
                    { name: "", description: "" },
                  ])
                }
              >
                <AddCircleOutlineRoundedIcon />
              </IconButton>
            </div>
            <div className="profile__form__section__certifications__fields">
              {certifications?.map((cert, index) => (
                <div className="profile__form__section__certifications__fields__inner">
                  <div className="profile__form__section__certifications__fields__inner__left">
                    <Form.Group className="profile__form__section__certifications__group">
                      <Form.Label className="profile__form__group__label profile__form__section__certifications__group__label">
                        Name
                      </Form.Label>
                      <Form.Control
                        disabled={isDisabled}
                        size="sm"
                        id={`cert-name-${index}`}
                        name={`cert-name-${index}`}
                        value={cert?.name}
                        onChange={(e) =>
                          handleCertNameChange(e.target.value, index)
                        }
                      />
                    </Form.Group>
                    <Form.Group className="profile__form__section__certifications__group">
                      <Form.Label className="profile__form__group__label profile__form__section__certifications__group__label">
                        Description
                      </Form.Label>
                      <Form.Control
                        disabled={isDisabled}
                        size="sm"
                        as="textarea"
                        rows={3}
                        id={`cert-description-${index}`}
                        name={`cert-description-${index}`}
                        value={cert?.description}
                        onChange={(e) =>
                          handleCertDescriptionChange(e.target.value, index)
                        }
                      />
                    </Form.Group>
                  </div>
                  <IconButton
                    disabled={isDisabled}
                    type="button"
                    onClick={() =>
                      setCertifications((certs) =>
                        certs.filter((_s, idx) => idx !== index)
                      )
                    }
                  >
                    <RemoveCircleOutlineRoundedIcon />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>
          <Form.Group className="profile__form__group">
            <Form.Label className="profile__form__group__label">
              Location
            </Form.Label>
            <Form.Control
              disabled={isDisabled}
              id="location"
              size="sm"
              name="location"
              onChange={formik.handleChange}
              value={formik.values.location}
            />
          </Form.Group>
          <Form.Group className="profile__form__group">
            <Form.Label className="profile__form__group__label">
              Twitter Profile
            </Form.Label>
            <Form.Control
              disabled={isDisabled}
              id="twitterUrl"
              size="sm"
              name="twitterUrl"
              onChange={formik.handleChange}
              value={formik.values.twitterUrl}
            />
          </Form.Group>
          <Form.Group className="profile__form__group">
            <Form.Label className="profile__form__group__label">
              Github Profile
            </Form.Label>
            <Form.Control
              disabled={isDisabled}
              id="githubUrl"
              size="sm"
              name="githubUrl"
              onChange={formik.handleChange}
              value={formik.values.githubUrl}
            />
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default Profile;
