import {
  StatusOrder,
  StatusPendingOrder,
  TrackStatusProps,
} from "./TrackStatus.model";
import "./TrackStatus.scss";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import classNames from "classnames";

import { Stepper, Step, StepLabel, StepConnector } from "@mui/material";

const TrackStatus = ({
  status,
  alignment = "horizontal",
}: TrackStatusProps) => {
  const index = StatusOrder.indexOf(status.toLowerCase());
  let FilteredStatusOrder: string[] = StatusOrder;
  const classes = classNames("track-status", `track-status--${alignment}`);
  if (index === 3) {
    FilteredStatusOrder = StatusOrder.filter((_item, index) => index <= 3);
  } else if (index < 3) {
    FilteredStatusOrder = StatusPendingOrder;
  } else if (index === 4) {
    FilteredStatusOrder = StatusOrder.filter(
      (item, index) => index <= 4 && item !== "application rejected"
    );
  }
  return (
    <div className={classes}>
      <Stepper
        orientation={alignment}
        activeStep={index + 1}
        alternativeLabel
        connector={<StepConnector />}
      >
        {FilteredStatusOrder.map((step) => (
          <Step key={step}>
            <StepLabel
              error={step === "application rejected"}
              className={`track-status__step-label ${
                step === "application considered"
                  ? "track-status__step-label--success"
                  : ""
              }`}
            >
              {step}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default TrackStatus;
