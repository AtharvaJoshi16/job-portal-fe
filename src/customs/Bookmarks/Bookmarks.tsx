import { useEffect, useState } from "react";
import { JobProps } from "../Job/Job.model";
import { Job } from "..";
import { getSavedJobs, removedSavedJob, saveJob } from "../Jobs/utils";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState<JobProps[]>([]);
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getSavedJobs(true);
      setBookmarks(response?.jobs?.savedJobs);
      const response2 = await getSavedJobs();
      setIds(response2?.jobs?.ids);
    })();
  }, []);

  return (
    <div className="bookmarks">
      {bookmarks?.map((job) => (
        <Job
          {...job}
          onSaveJob={saveJob}
          onRemoveSavedJob={removedSavedJob}
          bookmarks={ids}
        />
      ))}
    </div>
  );
};

export default Bookmarks;
