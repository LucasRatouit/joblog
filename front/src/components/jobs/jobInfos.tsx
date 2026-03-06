import { Calendar, Clock, RotateCcw } from "lucide-react";
import type { Job } from "../../api/services/job";

/**
 * Displays key dates and information for a job application.
 * Includes candidacy date, interview date, and follow-up date.
 *
 * @param {Object} props - Component properties
 * @param {Job} props.job - The job object to display info for
 * @returns {JSX.Element} The rendered job information section
 */
const JobInfos = ({ job }: { job: Job }): JSX.Element => {
  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "—";
    const d = new Date(date);
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (date: Date | string | null | undefined) => {
    if (!date) return "—";
    const d = new Date(date);
    return d.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const infoItems = [
    {
      label: "Candidature",
      value: formatDate(job.candidacyDate),
      icon: Calendar,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/15 dark:bg-blue-500/10",
    },
    {
      label: "Entretien",
      value: formatDateTime(job.interviewDate),
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-500/15 dark:bg-amber-500/10",
    },
    {
      label: "Relance",
      value: formatDate(job.followUpDate),
      icon: RotateCcw,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-500/15 dark:bg-purple-500/10",
    },
  ];

  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
      {infoItems.map((item, i) => (
        <div 
          key={i} 
          className="flex items-center gap-x-3 p-3 rounded-2xl bg-muted/50 dark:bg-muted border border-border/40 transition-colors hover:bg-muted/80 dark:hover:bg-muted/80"
        >
          <div className={`size-10 rounded-xl ${item.bgColor} flex items-center justify-center ${item.color} shadow-inner`}>
            <item.icon className="size-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 dark:text-muted-foreground/60 leading-none mb-1">
              {item.label}
            </p>
            <span className="text-sm font-bold truncate">
              {item.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobInfos;
