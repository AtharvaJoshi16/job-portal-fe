import { ApiResponse } from "../types/ApiResponse";

export interface ProfileProps {
  onEdit: (UserProfileData: UserProfileData) => Promise<ApiResponse>;
}

export interface UserProfileData {
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  currentEmployer: string;
  jobRole: string;
  yoe: number;
  education: {
    secondary: Education;
    higherSecondary: Education;
    graduation: Education;
  };
  experience?: Array<Experience>;
  skills?: Array<Skills>;
  certifications?: Array<Certifications>;
  location: string;
  githubUrl: string;
  twitterUrl: string;
}

export interface Education {
  school?: string;
  score?: number;
  university?: string;
  college?: string;
  stream?: string;
}

export interface Skills {
  name: string;
  level: SkillLevel;
}

export interface Certifications {
  name: string;
  description?: string;
}

export enum SkillLevel {
  BASIC = "BASIC",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  MASTERY = "MASTERY",
}

export interface Experience {
  employer: string;
  role: string;
  from: string;
  to: string;
}
