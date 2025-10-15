import {
  Building2,
  Calendar,
  ExternalLink,
  MapPin,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { deleteJob, type Job } from "../api/services/job";
import { statusGradientColor } from "../api/config";
import { toast } from "sonner";

const Jobs = (props: {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}) => {
  return (
    <div className="flex flex-col gap-y-1.5">
      {props.jobs.map((job) => (
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
            <div className="z-10 grid gap-3 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full py-2 flex gap-x-3 flex-wrap items-center rounded-lg relative"
                >
                  <div className="-z-20 bg-green-400 opacity-15 w-full h-full rounded-lg absolute" />
                  <Calendar className="text-green-400 w-5 h-5 ml-2" />
                  <div className="flex flex-col">
                    <p className="text-gray-400 text-nowrap text-[10px]">
                      Date de l'entretien
                    </p>
                    <span className="text-green-400 text-sm">12/12/2023</span>
                  </div>
                </div>
              ))}
            </div>
            {job.description && (
              <p className="bg-zinc-800 text-gray-400 p-3 rounded-lg">
                {job.description}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-2 justify-center">
            <Button variant="ghost" className="w-10 h-10 cursor-pointer">
              <SquarePen />
            </Button>
            <Button variant="ghost" className="w-10 h-10 cursor-pointer">
              <ExternalLink />
            </Button>
            <Button
              variant="destructive"
              className="w-10 h-10 cursor-pointer"
              onClick={() => {
                deleteJob(job.id).then(() => {
                  props.setJobs(
                    props.jobs.filter((jobItem) => jobItem.id !== job.id)
                  );
                  toast.success("Job supprimé !");
                });
              }}
            >
              <Trash2 />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Jobs;
