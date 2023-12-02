import * as Icons from "@mui/icons-material";
import { Icon } from "@mui/material";
export const DynamicIcon = ({ icon, color }) => {
  console.log(Icons[icon]);
  const Icon = Icons[icon];
  return <Icon />;
};
