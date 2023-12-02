import { useNavigate } from "react-router";
import "./Header.scss";
import { Avatar, Button, TextField } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import BadgeIcon from "@mui/icons-material/Badge";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useCallback, useEffect, useState } from "react";
import {
  Dropdown,
  ButtonGroup,
  Button as DropdownButton2,
} from "react-bootstrap";
import {
  addToStorage,
  getFromStorage,
  removeFromStorage,
} from "@/utils/localStorage.utils";
import { getProfileImage } from "../Profile/utils";
import { useReactResponsive } from "@/hooks/useReactResponsive.hooks";
const Header = () => {
  const { isDesktop, isDesktopLarge } = useReactResponsive();
  const navigate = useNavigate();
  const { _id: id, firstName, lastName } = getFromStorage("user");
  const [searchText, setSearchText] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const setProfileImageData = useCallback(() => {
    if (localStorage.userProfileImage) {
      setProfileImage(localStorage.userProfileImage);
    } else {
      getProfileImage(id).then((resp) => {
        setProfileImage(resp?.url);
        addToStorage("userProfileImage", resp?.url);
      });
    }
  }, [id]);

  useEffect(() => {
    setProfileImageData();
  }, [setProfileImageData]);

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

  const handleLogout = () => {
    removeFromStorage("user");
    removeFromStorage("userProfileImage");
    navigate("/login");
  };

  return isDesktop || isDesktopLarge ? (
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
            sx={{ fontSize: "small", width: "50%" }}
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
        <div
          className="header__right-section__avatar"
          title={`${firstName} ${lastName}`}
          onClick={() => navigate(`/profile/${id}`)}
        >
          <Avatar alt="user-profile-pic" src={profileImage} />
        </div>
        <Button onClick={handleLogout} variant="contained" color="primary">
          <LogoutIcon color="inherit" />
        </Button>
      </div>
    </div>
  ) : (
    <div className="header header-phone">
      <div className="header-phone__searchbar">
        <Dropdown
          id="dropdown-filter-button"
          onSelect={(e) => handleFilterJob(e)}
        >
          <Button
            size="small"
            sx={{ minWidth: "48px", padding: "6px" }}
            variant="outlined"
            onClick={handleSearchByButton}
          >
            <TuneRoundedIcon
              sx={{
                width: "22px",
                height: "22px",
              }}
              color="inherit"
            />
          </Button>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="jobRole">Job Role</Dropdown.Item>
            <Dropdown.Item eventKey="datePosted">Date Posted</Dropdown.Item>
            <Dropdown.Item eventKey="experience">Experience</Dropdown.Item>
            <Dropdown.Item eventKey="location">Location</Dropdown.Item>
            <Dropdown.Item eventKey="skill">Skill</Dropdown.Item>
            <Dropdown.Item eventKey="organization">Organization</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <TextField
          sx={{ fontSize: "small", width: "70%" }}
          size="small"
          id="outlined-basic"
          label="Search for job here..."
          variant="outlined"
          onKeyDown={(e) => handleSearch(e)}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          size="small"
          sx={{ minWidth: "48px" }}
          variant="text"
          onClick={handleSearchByButton}
        >
          <SearchRoundedIcon color="inherit" />
        </Button>
      </div>
      <div
        className="header-phone__avatar"
        title={`${firstName} ${lastName}`}
        onClick={() => navigate(`/profile/${id}`)}
      >
        <Avatar alt="user-profile-pic" src={profileImage} />
      </div>
    </div>
  );
};

export default Header;
