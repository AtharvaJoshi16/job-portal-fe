import { BottomNavigationAction, BottomNavigation } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import BadgeIcon from "@mui/icons-material/Badge";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useContext } from "react";
import "./BottomNav.scss";
import { useNavigate } from "react-router";
import { NavContext } from "./nav.context";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import { getFromStorage } from "@/utils/localStorage.utils";

export const BottomNav = () => {
  const navigate = useNavigate();
  const userId = getFromStorage("user")?._id;
  const { activeIndex, setActiveIndex } = useContext(NavContext);
  const handleNavigate = (newValue: number) => {
    setActiveIndex?.(newValue);
    switch (newValue) {
      case 0: {
        navigate("/jobs");
        break;
      }
      case 1: {
        navigate("/bookmarks");
        break;
      }
      case 2: {
        navigate("/applies");
        break;
      }
      case 3: {
        navigate(`/profile/${userId}`);
        break;
      }
      default: {
        navigate("/");
      }
    }
  };
  return (
    <div className="bottom-nav">
      <BottomNavigation
        sx={{
          background: "#1976d2",
          borderRadius: "5px 5px 0 0",
        }}
        showLabels
        value={activeIndex}
        onChange={(_event, newValue) => {
          handleNavigate(newValue);
        }}
      >
        <BottomNavigationAction
          label="Jobs"
          icon={
            activeIndex === 0 ? (
              <BusinessCenterIcon style={{ color: "white" }} />
            ) : (
              <BusinessCenterOutlinedIcon style={{ color: "white" }} />
            )
          }
        />
        <BottomNavigationAction
          label="Bookmarks"
          icon={
            activeIndex === 1 ? (
              <BookmarksIcon style={{ color: "white" }} />
            ) : (
              <BookmarksOutlinedIcon style={{ color: "white" }} />
            )
          }
        />
        <BottomNavigationAction
          label="Applies"
          icon={
            activeIndex === 2 ? (
              <BadgeIcon style={{ color: "white" }} />
            ) : (
              <BadgeOutlinedIcon style={{ color: "white" }} />
            )
          }
        />
        <BottomNavigationAction
          label="Profile"
          icon={
            activeIndex === 3 ? (
              <PersonRoundedIcon style={{ color: "white" }} />
            ) : (
              <PermIdentityRoundedIcon style={{ color: "white" }} />
            )
          }
        />
      </BottomNavigation>
    </div>
  );
};
