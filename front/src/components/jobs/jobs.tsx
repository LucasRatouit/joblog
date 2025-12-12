import { Building2, MapPin } from "lucide-react";
import { Card } from "../ui/card";
import { statusGradientColor } from "../../api/config";
import JobActions from "./jobActions";
import JobInfos from "./jobInfos";
import { useJobStore } from "../../stores/job";

const Jobs = () => {
  const { jobsFiltered } = useJobStore();

  return (
    <div className="flex flex-col gap-y-1.5">
      {jobsFiltered.map((job) => (
        <Card
          key={job.id}
          className="z-10 border-0 pl-6 pr-4 py-4 flex flex-row gap-x-2 relative"
        >
          <div
            className={`-z-10 bg-gradient-to-b ${statusGradientColor(job.status)} w-full h-full rounded-lg absolute top-0 left-0`}
          />
          <div
            className={`-z-10 bg-card w-[calc(100%-4px)] h-full rounded-lg absolute top-0 right-0`}
          />
          <div className="w-full flex flex-col gap-y-3">
            <p className="font-bold text-xl text-nowrap">{job.title}</p>
            <div className="flex gap-x-6">
              {job.company && (
                <p className="text-gray-400 font-medium text-nowrap flex gap-x-1 items-center">
                  <Building2 className="w-4 h-4" /> {job.company}
                </p>
              )}
              {job.location && (
                <p className="text-gray-400 font-medium text-nowrap flex gap-x-1 items-center">
                  <MapPin className="w-4 h-4" /> {job.location}
                </p>
              )}
            </div>
            <JobInfos job={job} />
            {job.description && (
              <p className="bg-zinc-100 dark:bg-zinc-700 text-gray-500 dark:text-gray-300 p-3 rounded-lg">
                {job.description}
              </p>
            )}
          </div>
          <JobActions job={job} />
        </Card>
      ))}
    </div>
  );
};

export default Jobs;
