import { useNavigate } from "react-router";
import "./Header.scss";
import { Avatar, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import BadgeIcon from "@mui/icons-material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";

import { DropdownButton, Dropdown, Form } from "react-bootstrap";
const Header = () => {
  const navigate = useNavigate();
  const { id } = JSON.parse(localStorage.user);
  const [profileImage, setProfileImage] = useState("");
  useEffect(() => {
    setProfileImage(localStorage.userProfileImage);
  }, []);

  const handleFilterJob = (e) => {
    navigate("/jobs", {
      state: {
        filter: e,
      },
    });
  };

  return (
    <div className="header">
      <div className="header__navigation">
        <ul className="header__navigation__list">
          <li className="header__navigation__list__item">
            <div
              onClick={() => navigate("/jobs")}
              className="header__navigation__list__item__icon-link"
            >
              <BusinessCenterIcon color="info" />
              <p>Jobs</p>
            </div>
          </li>
          <li className="header__navigation__list__item">
            <div
              onClick={() => navigate("/bookmarks")}
              className="header__navigation__list__item__icon-link"
            >
              <BookmarksIcon color="info" />
              <p>Bookmarks</p>
            </div>
          </li>
          <li className="header__navigation__list__item">
            <div className="header__navigation__list__item__icon-link">
              <BadgeIcon color="info" />
              <p>Applies</p>
            </div>
          </li>
        </ul>
        <div className="header__searchbar">
          <DropdownButton
            id="dropdown-filter-button"
            variant="secondary"
            title="Filter Jobs"
            onSelect={(e) => handleFilterJob(e)}
          >
            <Dropdown.Item eventKey="jobRole">Job Role</Dropdown.Item>
            <Dropdown.Item eventKey="datePosted">Date Posted</Dropdown.Item>
            <Dropdown.Item eventKey="experience">Experience</Dropdown.Item>
            <Dropdown.Item eventKey="location">Location</Dropdown.Item>
            <Dropdown.Item eventKey="skill">Skill</Dropdown.Item>
            <Dropdown.Item eventKey="organization">Organization</Dropdown.Item>
          </DropdownButton>
          <Form.Control
            id="search"
            name="search"
            placeholder="Search for a job"
          />
          <DropdownButton
            id="dropdown-search-by-button"
            variant="secondary"
            title="Search By"
          >
            <Dropdown.Item eventKey="jobRole">Job Role</Dropdown.Item>
            <Dropdown.Item eventKey="experience">Experience</Dropdown.Item>
            <Dropdown.Item eventKey="location">Location</Dropdown.Item>
            <Dropdown.Item eventKey="skill">Skill</Dropdown.Item>
            <Dropdown.Item eventKey="organization">Organization</Dropdown.Item>
          </DropdownButton>
          <Button variant="contained" color="info">
            <SearchIcon color="inherit" />
          </Button>
        </div>
      </div>
      <div className="header__right-section">
        <div
          className="header__right-section__avatar"
          title=""
          onClick={() => navigate(`/profile/${id}`)}
        >
          <Avatar alt="user-profile-pic" src={profileImage} />
        </div>
        <Button onClick={() => {}} variant="contained" color="primary">
          <LogoutIcon color="inherit" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
