import { BadgeCheck, Clock, List, TriangleAlert, Users } from "lucide-react";
import type { ReactNode } from "react";
import { statusGradientColor } from "../api/config";
import { useJobStore } from "../stores/job";

const InfoCard = (props: {
  name: string;
  number: number;
  logo: ReactNode;
  color?: string;
}) => {
  return (
    <div
      className="bg-card w-full min-w-2 grow shrink px-7 py-4
                  flex justify-between items-center rounded-lg shadow-lg relative"
    >
      <div className="z-10 bg-card w-full h-full rounded-lg absolute top-0 left-0" />
      <div
        className={`z-0 h-full w-full pt-6 bg-gradient-to-br ${statusGradientColor(props.color!)} rounded-lg absolute top-1 left-0`}
      />
      <div className="z-10 flex flex-col">
        <p className="text-gray-400 font-medium text-sm">{props.name}</p>
        <span className="text-secondary-foreground font-semibold text-3xl">
          {props.number}
        </span>
      </div>
      <div
        className={`z-10 text-white bg-gradient-to-br ${statusGradientColor(props.color!)} w-min h-min p-3 rounded-lg`}
      >
        {props.logo}
      </div>
    </div>
  );
};

const InfoCardList = () => {
  const { jobs } = useJobStore();

  return (
    <div className="pb-1 grid gap-x-2 gap-y-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
      <InfoCard name="Total" number={jobs.length} logo={<List />} />
      <InfoCard
        name="En attente"
        number={jobs.filter((job) => job.status === "PENDING").length}
        logo={<Clock />}
        color="PENDING"
      />
      <InfoCard
        name="Entretiens"
        number={jobs.filter((job) => job.status === "INTERVIEW").length}
        logo={<Users />}
        color="INTERVIEW"
      />
      <InfoCard
        name="À rappeler"
        number={jobs.filter((job) => job.status === "FOLLOW_UP").length}
        logo={<TriangleAlert />}
        color="FOLLOW_UP"
      />
      <InfoCard
        name="Acceptées"
        number={jobs.filter((job) => job.status === "ACCEPTED").length}
        logo={<BadgeCheck />}
        color="ACCEPTED"
      />
    </div>
  );
};

export default InfoCardList;
