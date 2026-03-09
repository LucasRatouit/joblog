import { BadgeCheck, Clock, List, TriangleAlert, Users } from "lucide-react";
import type { ReactNode } from "react";
import { statusGradientColor } from "../api/config";
import { useJobStore } from "../stores/job";
import { cn } from "../lib/utils";

interface InfoCardProps {
  name: string;
  number: number;
  logo: ReactNode;
  color?: string;
  className?: string;
}

/**
 * A statistics card displaying a number and an icon with status-based coloring.
 *
 * @param props - Component properties
 * @returns {JSX.Element} The rendered info card
 */
const InfoCard = ({
  name,
  number,
  logo,
  color = "default",
  className,
}: InfoCardProps): JSX.Element => {
  return (
    <div
      className={cn(
        "group relative bg-card border border-border/40 rounded-3xl p-4 sm:p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-primary/5",
        className
      )}
    >
      {/* Status accent bar */}
      <div
        className={cn(
          "absolute top-4 sm:top-6 left-0 w-1.5 h-8 sm:h-10 rounded-r-full bg-gradient-to-b transition-all duration-500 group-hover:h-12 sm:group-hover:h-14",
          statusGradientColor(color)
        )}
      />

      <div className="flex justify-between items-start pl-1 sm:pl-2">
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-foreground/40 dark:text-muted-foreground/60">
            {name}
          </p>
          <h3 className="text-2xl sm:text-4xl font-black tracking-tighter tabular-nums">
            {number}
          </h3>
        </div>
        
        <div
          className={cn(
            "size-10 sm:size-12 shrink-0 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 bg-gradient-to-br",
            statusGradientColor(color)
          )}
        >
          <div className="scale-90 sm:scale-100">
            {logo}
          </div>
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute bottom-0 right-0 size-16 sm:size-24 bg-gradient-to-br from-transparent to-muted/20 rounded-tl-[3rem] sm:rounded-tl-[4rem] -z-10 opacity-50 group-hover:scale-110 transition-transform duration-700" />
    </div>
  );
};

/**
 * A grid list of info cards showing job application statistics.
 *
 * @returns {JSX.Element} The rendered list of info cards
 */
const InfoCardList = (): JSX.Element => {
  const { jobs } = useJobStore();

  const stats = [
    { 
      name: "Total", 
      number: jobs.length, 
      logo: <List className="size-5 sm:size-6" />, 
      color: "default" 
    },
    {
      name: "En attente",
      number: jobs.filter((job) => job.status === "PENDING").length,
      logo: <Clock className="size-5 sm:size-6" />,
      color: "PENDING",
    },
    {
      name: "Entretiens",
      number: jobs.filter((job) => job.status === "INTERVIEW").length,
      logo: <Users className="size-5 sm:size-6" />,
      color: "INTERVIEW",
    },
    {
      name: "À rappeler",
      number: jobs.filter((job) => job.status === "FOLLOW_UP").length,
      logo: <TriangleAlert className="size-5 sm:size-6" />,
      color: "FOLLOW_UP",
    },
    {
      name: "Acceptées",
      number: jobs.filter((job) => job.status === "ACCEPTED").length,
      logo: <BadgeCheck className="size-5 sm:size-6" />,
      color: "ACCEPTED",
    },
  ];

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 animate-in fade-in slide-in-from-top-4 duration-1000">
      {stats.map((stat) => (
        <InfoCard
          key={stat.name}
          name={stat.name}
          number={stat.number}
          logo={stat.logo}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default InfoCardList;
