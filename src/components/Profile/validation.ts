import * as yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const stringRegex = /^[a-zA-Z_ ]*$/;
const urlRegex =
  /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w?[a-zA-Z-_%/@?]+)*([^/\w?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
export const profileSchema = yup.object().shape({
  phoneNumber: yup.string().matches(phoneRegExp, "Invalid Phone Number"),
  currentEmployer: yup
    .string()
    .matches(stringRegex, "Current Employer cannot contain special characters"),
  jobRole: yup
    .string()
    .matches(stringRegex, "Job Role cannot contain special characters"),
  education: yup.object({
    secondary: yup.object({
      school: yup
        .string()
        .matches(stringRegex, "School cannot contain special characters"),
      score: yup.number(),
    }),
    higherSecondary: yup.object({
      school: yup
        .string()
        .matches(stringRegex, "School cannot contain special characters"),
      score: yup.number(),
    }),
    graduation: yup.object({
      university: yup
        .string()
        .matches(stringRegex, "University cannot contain special characters"),
      college: yup
        .string()
        .matches(stringRegex, "College cannot contain special characters"),
      stream: yup
        .string()
        .matches(stringRegex, "Stream cannot contain special characters"),
      score: yup.number(),
    }),
    experience: yup.array().of(
      yup.object({
        employer: yup
          .string()
          .matches(stringRegex, "Employer cannot contain special characters"),
        role: yup
          .string()
          .matches(stringRegex, "Role cannot contain special characters"),
        from: yup.number() || yup.string().matches(/^(Present)/),
      })
    ),
    twitterUrl: yup.string().matches(urlRegex, "Enter a valid URL"),
    githubUrl: yup.string().matches(urlRegex, "Enter a valid URL"),
  }),
});
