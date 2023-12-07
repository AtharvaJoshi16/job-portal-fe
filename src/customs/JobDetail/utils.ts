import axios from "axios";
import DateDiff from "date-diff";

export const getJobByID = async (jobId: string) => {
  const response = await axios.get(
    `http://localhost:8081/jobs/v1/view-jobs?job_id=${jobId}`
  );
  return response.data;
};

export const editJob = async (jobData, recruiter_id: string) => {
  const response = await axios.post(
    `http://localhost:8081/jobs/v1/create-edit-job?recruiter_id=${recruiter_id}&job_id=${jobData._id}`,
    jobData
  );
  return response.data;
};

export const returnDateDifference = (postedDate: string) => {
  const str = postedDate.split("/");
  const d = str.reverse().join(",");
  const date1 = new Date(d);
  const date2 = new Date();
  let result = 0;
  let unit = "";
  const diff = new DateDiff(date2, date1);
  if (diff.years() >= 1) {
    result = diff.years();
    unit = "years";
  } else if (diff.months() >= 1) {
    result = diff.months();
    unit = "months";
  } else if (diff.weeks() >= 1) {
    result = diff.weeks();
    unit = "weeks";
  } else if (diff.days() >= 1) {
    result = diff.days();
    unit = "days";
  } else if (diff.hours() >= 1) {
    result = diff.hours();
    unit = "hours";
  } else if (diff.minutes() >= 1) {
    result = diff.minutes();
    unit = "minutes";
  } else if (diff.seconds() >= 1) {
    result = diff.seconds();
    unit = "seconds";
  }
  return `${Math.round(result)} ${unit} ago`;
};
