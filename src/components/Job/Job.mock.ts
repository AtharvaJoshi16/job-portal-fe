import { JobProps } from "./Job.model";

export const jobMockData: JobProps = {
  _id: "4fea9b01-bfc7-4883-ab08-bc8f9d502ded",
  applicants: [
    "4fea9b01-bfc7-4883-ab08-bc8f9d502ded",
    "4fssd9b01-bfc7-4883-ab08-bc8f9d502ded",
  ],
  applications: 2,
  comments: [
    {
      _id: "4fea9b01-bfc7-4883-ab08-bc8f9d502ded",
      comment: "Interested!",
      likes: 0,
      likedBy: [],
    },
    {
      _id: "4fea9b01-bfc7-4883-ab08-bc8f9d502321",
      comment: "Interested!!!!!",
      likes: 0,
      likedBy: [],
    },
  ],
  ctc: "30 LPA",
  datePosted: "15/11/2023",
  description: {
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    responsibilities: [
      "You could either be working with our Product Designers & Managers to improve the design and implementation of our existing products, build an entirely new line of products, or even writing the underlying library that powers our stadium seat layouts! We're open to figuring out the right fit based on your skillset.",
      "Own the entire product experience as you will be the one delivering the final product to the consumer.",
      "Participate in code reviews and help collectively solve complex problems like routing, repo structure, isomorphic rendering, automated performance benchmarking integrations, etc.",
    ],
    requirements: [
      "We're looking for experienced developers who take pride on their code rather than the frameworks they know (although good programmers know the right frameworks).",
      "One's who don't settle. They are brave enough to dream big and work hard to achieve it.",
      "Having experience with the latest web technologies such as React.JS, ES6, WebPack, PWA is an added advantage.",
    ],
  },
  experienceLevel: "5-7",
  jobRole: "SQL Developer",
  locations: ["Delhi NCR", "Mumbai", "Chennai", "Pune", "Nagpur", "Ahmedabad"],
  organization: "Oracle",
  organizationLogo: "/assets/oracle_logo.png",
  recruiter_id: "c4d51491-658b-4600-8dc2-5d094f429f10",
  skills: ["React", "Node.js", "Python"],
  workingMode: "Hybrid",
  appliedJobs: [],
};
