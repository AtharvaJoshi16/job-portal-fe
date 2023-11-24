export interface JobProps {
  _id: string;
  jobRole: string;
  experienceLevel: string;
  description?: Description;
  applicants: Array<string>;
  applications: number;
  ctc?: string;
  comments: Array<Comment>;
  datePosted: string;
  locations: Array<string>;
  organization: string;
  organizationLogo?: string;
  skills: Array<string>;
  workingMode: string;
  recruiter_id: string;
  onSaveJob: (job_id: string) => void;
  onRemoveSavedJob: (job_id: string) => void;
  bookmarks: string[];
}

export interface Description {
  about: string;
  responsibilities: Array<string>;
  requirements: Array<string>;
}

export interface Comment {
  _id: string;
  comment: string;
  likedBy: Array<string>;
  likes: number;
}