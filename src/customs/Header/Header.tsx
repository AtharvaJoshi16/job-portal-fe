/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router";
import "./Header.scss";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Icon } from "@mui/material";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import mainNavigationData from "../../authoredData/main-navigation.json";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useReactResponsive } from "@/hooks/useReactResponsive.hooks";
import { Dropdown } from "react-bootstrap";
import {
  addToStorage,
  getFromStorage,
  removeFromStorage,
} from "@/utils/localStorage.utils";
import { getProfileImage } from "../Profile/utils";
const Header = () => {
  const navigate = useNavigate();
  const { isDesktop, isDesktopLarge } = useReactResponsive();
  const { _id: id, firstName, lastName, role } = getFromStorage("user");
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
          {mainNavigationData[role].map((item) => (
            <li className="header__navigation__list__item">
              <div
                onClick={() => navigate(item.link)}
                className="header__navigation__list__item__icon-link"
              >
                <Icon color={item.icon.color}>{item.icon.name}</Icon>
                <p>{item.label}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="header__searchbar">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm">
                <TuneRoundedIcon color="inherit" fontSize="small" />
                <ChevronDown size={16} className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                accessKey="jobRole"
                onSelect={(e) => handleFilterJob((e.target as any)?.accessKey)}
              >
                Job Role
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => handleFilterJob((e.target as any)?.accessKey)}
                accessKey="datePosted"
              >
                Date Posted
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => handleFilterJob((e.target as any)?.accessKey)}
                accessKey="experience"
              >
                Experience
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => handleFilterJob((e.target as any)?.accessKey)}
                accessKey="location"
              >
                Location
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => handleFilterJob((e.target as any)?.accessKey)}
                accessKey="skill"
              >
                Skill
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => handleFilterJob((e.target as any)?.accessKey)}
                accessKey="organization"
              >
                Organization
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="header__searchbar__right">
            <Input
              id="search-basic"
              placeholder="Search for job here..."
              onKeyDown={(e) => handleSearch(e)}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button variant="outline" onClick={handleSearchByButton}>
              <SearchRoundedIcon color="inherit" />
            </Button>
          </div>
        </div>
      </div>
      <div className="header__right-section">
        <div
          className="header__right-section__avatar"
          title={`${firstName} ${lastName}`}
          onClick={() => navigate(`/profile/${id}`)}
        >
          <Avatar
            className="header__right-section__avatar__comp"
            alt="user-profile-pic"
            src={profileImage}
          />
        </div>
        <Button onClick={handleLogout} variant="outline">
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
            size="sm"
            //sx={{ minWidth: "48px", padding: "6px" }}
            variant="outline"
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
        <Input
          //sx={{ fontSize: "small", width: "70%" }}
          //size="sm"
          id="outlined-basic"
          placeholder="Search for job here..."
          //variant="outline"
          onKeyDown={(e) => handleSearch(e)}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          size="sm"
          //sx={{ minWidth: "48px" }}
          variant="outline"
          onClick={handleSearchByButton}
        >
          <SearchRoundedIcon color="inherit" />
        </Button>
      </div>
      <div
        className="header__right-section__avatar"
        title={`${firstName} ${lastName}`}
        onClick={() => navigate(`/profile/${id}`)}
      >
        <Avatar
          className="header__right-section__avatar__comp"
          alt="user-profile-pic"
          src={profileImage}
        />
      </div>
    </div>
  );
};

export default Header;
