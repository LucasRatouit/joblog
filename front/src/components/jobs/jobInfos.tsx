import { Calendar } from "lucide-react";
import type { Job } from "../../api/services/job";

const JobInfos = ({ job }: { job: Job }) => {
  return (
    <div className="z-10 grid gap-3 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
      <div className="w-full py-2 flex gap-x-3 flex-wrap items-center rounded-lg relative">
        <div className="-z-20 bg-zinc-100 dark:bg-zinc-700 w-full h-full rounded-lg absolute" />
        <Calendar className="w-5 h-5 ml-2" />
        <div className="flex flex-col">
          <p className="text-gray-400 text-nowrap text-[10px]">
            Date de candidature
          </p>
          <span className="text-sm">
            {job.candidacyDate ? job.candidacyDate.toDateString() : "xxx"}
          </span>
        </div>
      </div>
      <div className="w-full py-2 flex gap-x-3 flex-wrap items-center rounded-lg relative">
        <div className="-z-20 bg-zinc-100 dark:bg-zinc-700 w-full h-full rounded-lg absolute" />
        <Calendar className="w-5 h-5 ml-2" />
        <div className="flex flex-col">
          <p className="text-gray-400 text-nowrap text-[10px]">
            Date de l'entretien
          </p>
          <span className="text-sm">
            {job.interviewDate
              ? new Date(job.interviewDate).toLocaleString("fr-FR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "xxx"}
          </span>
        </div>
      </div>
      <div className="w-full py-2 flex gap-x-3 flex-wrap items-center rounded-lg relative">
        <div className="-z-20 bg-zinc-100 dark:bg-zinc-700 w-full h-full rounded-lg absolute" />
        <Calendar className="w-5 h-5 ml-2" />
        <div className="flex flex-col">
          <p className="text-gray-400 text-nowrap text-[10px]">
            Date de relance
          </p>
          <span className="text text-sm">
            {job.followUpDate
              ? new Date(job.followUpDate).toDateString()
              : "xxx"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobInfos;
