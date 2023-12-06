import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Inputs } from "./PostJob.model";
import "./PostJob.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/components/theme-provider";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { createJob } from "./utils";
import { getFromStorage } from "@/utils/localStorage.utils";

const PostJob = () => {
  const { theme } = useTheme();
  const { _id: userId, organization } = getFromStorage("user");
  const form = useForm<Inputs>({
    defaultValues: {
      jobRole: "",
      ctc: "",
      locations: [],
      description: {
        about: "",
        responsibilities: "",
        requirements: "",
      },
      experienceLevel: "",
      applications: 0,
      workingMode: "office",
      datePosted: new Date(),
      skills: [],
      applicants: [],
      comments: [],
      openings: 0,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { responsibilities, requirements } = data.description;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = data;
    payload.description.responsibilities = responsibilities.split("\n");
    payload.description.requirements = requirements.split("\n");
    payload.ctc += " LPA";
    payload.postedDate = new Date();
    payload.organization = organization;
    const response = await createJob(payload, userId);
    alert(response?.message);
  };
  return (
    <div className="post-job">
      <div
        className={`post-job__header ${
          theme === "dark" ? "post-job__header--dark" : ""
        }`}
      >
        POST A JOB HERE
      </div>
      <Form {...form}>
        <form className="post-job__form" onSubmit={form.handleSubmit(onSubmit)}>
          <FormItem className="post-job__form__group__item">
            <FormLabel>Organization</FormLabel>
            <FormControl>
              <Input
                disabled
                placeholder="Enter job role"
                value={organization}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <div className="post-job__form__group">
            <FormField
              control={form.control}
              name="jobRole"
              render={({ field }) => (
                <FormItem className="post-job__form__group__item">
                  <FormLabel>Job Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter job role" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ctc"
              render={({ field }) => (
                <FormItem className="post-job__form__group__item">
                  <FormLabel>Salary (per annum)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter ctc to be offered" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Autocomplete
            onChange={(_e, value) => form.setValue("locations", value)}
            multiple
            sx={{
              background: "white",
              color: "black",
              borderRadius: "4px",
            }}
            id="locations-chips"
            options={["Pune", "Mumbai", "Chennai", "Gurgaon", "Noida"]}
            freeSolo
            renderTags={(value, props) =>
              value.map((option, index) => (
                <Chip label={option} {...props({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                placeholder="Enter job locations"
                {...params}
                size="small"
              />
            )}
          />
          <div className="post-job__form__group">
            <FormField
              control={form.control}
              name="openings"
              render={({ field }) => (
                <FormItem className="post-job__form__group__item">
                  <FormLabel>Openings</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter number of openings" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experienceLevel"
              render={({ field }) => (
                <FormItem className="post-job__form__group__item">
                  <FormLabel>Experience Level</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter experience level range e.g. (3-5)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="post-job__form__group">
            <FormField
              control={form.control}
              name="workingMode"
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="w-{30}">
                    <SelectValue placeholder="Working Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {["hybrid", "remote", "office"].map((mode) => (
                        <SelectItem value={mode}>{mode}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <Autocomplete
              onChange={(_e, value) => form.setValue("skills", value)}
              multiple
              size="small"
              sx={{
                background: "white",
                borderRadius: "4px",
                height: "fit-content",
              }}
              className="post-job__form__group__item"
              id="skills-chips"
              options={["react", "node.js", "express", "webRTC"]}
              freeSolo
              renderTags={(value, props) =>
                value.map((option, index) => (
                  <Chip label={option} {...props({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  placeholder="Enter skills required"
                  {...params}
                  size="small"
                />
              )}
            />
          </div>
          <Separator
            className="mt-3 mb-3"
            style={{ backgroundColor: "gray" }}
          />
          <p className="post-job__form__description__heading">Description</p>
          <FormField
            control={form.control}
            name="description.about"
            render={({ field }) => (
              <FormItem className="post-job__form__group__item">
                <FormLabel>About the role</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter about the role specified"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description.responsibilities"
            render={({ field }) => (
              <FormItem className="post-job__form__group__item">
                <FormLabel>Job Responsibilities</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter points separated by newline"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description.requirements"
            render={({ field }) => (
              <FormItem className="post-job__form__group__item">
                <FormLabel>Job Requirements</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter points separated by newline"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="post-job__form__submit"
            variant="outline"
            type="submit"
          >
            Post
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PostJob;
