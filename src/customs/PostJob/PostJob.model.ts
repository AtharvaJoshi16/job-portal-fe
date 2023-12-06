import { Comment } from "../Job/Job.model";

export interface Inputs {
  locations: string[];
  jobRole: string;
  ctc: string;
  description: InputDescription;
  experienceLevel: string;
  applications: number;
  workingMode: "remote" | "hybrid" | "office";
  datePosted: Date;
  skills: Array<string>;
  applicants: Array<string>;
  comments: Array<Comment>;
  openings: number;
}

export interface InputDescription {
  about: string;
  responsibilities: string;
  requirements: string;
}
