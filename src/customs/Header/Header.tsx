import { useNavigate } from "react-router";
import "./Header.scss";
import { Avatar, Button, TextField } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import BadgeIcon from "@mui/icons-material/Badge";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useEffect, useState } from "react";

import {
  Dropdown,
  ButtonGroup,
  Button as DropdownButton2,
} from "react-bootstrap";
import { ModeToggle } from "@/components/mode-toggle";
const Header = () => {
  const navigate = useNavigate();
  const { id } = JSON.parse(localStorage.user);
  const [searchText, setSearchText] = useState("");
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

  const handleSearchByButton = async () => {
    if (searchText) {
      navigate("/search", {
        state: {
          searchText: searchText,
        },
      });
    }
  };

  const handleSearch = async (e?: React.KeyboardEvent<HTMLDivElement>) => {
    if (e?.key === "Enter" || e?.keyCode === 13) {
      if ((e?.target as HTMLInputElement)?.value) {
        navigate("/search", {
          state: {
            searchText: (e?.target as HTMLInputElement)?.value,
          },
        });
      }
    }
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
            <div
              onClick={() => navigate("/applies")}
              className="header__navigation__list__item__icon-link"
            >
              <BadgeIcon color="info" />
              <p>Applies</p>
            </div>
          </li>
        </ul>
        <div className="header__searchbar">
          <Dropdown
            as={ButtonGroup}
            id="dropdown-filter-button"
            onSelect={(e) => handleFilterJob(e)}
          >
            <DropdownButton2
              variant="primary"
              onClick={() => {
                navigate("/jobs", {
                  state: {
                    filter: "jobRole",
                  },
                });
              }}
            >
              <TuneRoundedIcon color="inherit" />
            </DropdownButton2>
            <Dropdown.Toggle split variant="success" id="dropdown-filter" />
            <Dropdown.Menu>
              <Dropdown.Item eventKey="jobRole">Job Role</Dropdown.Item>
              <Dropdown.Item eventKey="datePosted">Date Posted</Dropdown.Item>
              <Dropdown.Item eventKey="experience">Experience</Dropdown.Item>
              <Dropdown.Item eventKey="location">Location</Dropdown.Item>
              <Dropdown.Item eventKey="skill">Skill</Dropdown.Item>
              <Dropdown.Item eventKey="organization">
                Organization
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <TextField
            sx={{ fontSize: "small" }}
            size="small"
            id="outlined-basic"
            label="Search for job here..."
            variant="outlined"
            onKeyDown={(e) => handleSearch(e)}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="contained" onClick={handleSearchByButton}>
            <SearchRoundedIcon color="inherit" />
          </Button>
        </div>
      </div>
      <div className="header__right-section">
        <ModeToggle />
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
