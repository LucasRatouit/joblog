import { Building2, MapPin, SearchX } from "lucide-react";
import { Card } from "../ui/card";
import { statusGradientColor, statusEnumToString } from "../../api/config";
import JobActions from "./jobActions";
import JobInfos from "./jobInfos";
import { useJobStore } from "../../stores/job";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";

/**
 * List of job application cards.
 * Displays filtered jobs with their details and available actions.
 * Includes an empty state if no jobs match the filters.
 *
 * @returns {JSX.Element} The rendered list of jobs
 */
const Jobs = (): JSX.Element => {
  const { jobsFiltered } = useJobStore();

  if (jobsFiltered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-in fade-in zoom-in duration-700">
        <div className="size-20 bg-muted/30 rounded-full flex items-center justify-center mb-6 border border-dashed border-border/60">
          <SearchX className="size-10 text-muted-foreground/40" />
        </div>
        <h3 className="text-xl font-black tracking-tight mb-2">Aucun résultat trouvé</h3>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          Nous n'avons trouvé aucune candidature correspondant à vos critères de recherche.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
      {jobsFiltered.map((job) => (
        <Card
          key={job.id}
          className="group relative overflow-hidden border-border/40 bg-card hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-primary/5 rounded-3xl p-0"
        >
          {/* Status color bar */}
          <div className={cn(
            "absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b opacity-70 group-hover:w-2 transition-all duration-500",
            statusGradientColor(job.status)
          )} />

          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-black tracking-tighter leading-none group-hover:text-primary transition-colors">
                  {job.title}
                </h3>
                <Badge className={cn(
                  "rounded-full font-black text-[10px] uppercase tracking-widest px-3 py-1 border-0 text-white shadow-sm",
                  statusGradientColor(job.status)
                )}>
                  {statusEnumToString(job.status)}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {job.company && (
                  <div className="flex items-center gap-x-2 text-foreground/60 font-bold text-sm">
                    <div className="size-8 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                      <Building2 className="size-4 text-foreground/80" />
                    </div>
                    {job.company}
                  </div>
                )}
                {job.location && (
                  <div className="flex items-center gap-x-2 text-foreground/60 font-bold text-sm">
                    <div className="size-8 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                      <MapPin className="size-4 text-foreground/80" />
                    </div>
                    {job.location}
                  </div>
                )}
              </div>

              <JobInfos job={job} />

              {job.comment && (
                <div className="relative group/comment">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-muted rounded-full" />
                  <p className="text-sm font-medium text-muted-foreground italic pl-4 py-1 leading-relaxed">
                    "{job.comment}"
                  </p>
                </div>
              )}
            </div>

            <div className="md:border-l border-border/30 md:pl-6 w-full md:w-auto flex md:flex-col justify-end items-center gap-2">
              <JobActions job={job} />
            </div>
          </div>
          
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 size-40 bg-gradient-to-br from-primary/5 via-transparent to-transparent -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </Card>
      ))}
    </div>
  );
};

export default Jobs;
