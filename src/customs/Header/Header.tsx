/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router";
import "./Header.scss";
import { ChevronDown } from "lucide-react";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import BadgeIcon from "@mui/icons-material/Badge";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        <ModeToggle />
        <div
          className="header__right-section__avatar"
          title=""
          onClick={() => navigate(`/profile/${id}`)}
        >
          <Avatar
            className="header__right-section__avatar__comp"
            alt="user-profile-pic"
            src={profileImage}
          />
        </div>
        <Button onClick={() => {}} variant="destructive">
          <LogoutIcon color="inherit" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
