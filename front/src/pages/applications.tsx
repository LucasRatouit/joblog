import { useEffect } from "react";
import AppSidebar from "../components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { useJobStore } from "../stores/job";
import { statusEnumToString, statusGradientColor } from "../api/config";
import { cn } from "../lib/utils";
import { Building2, MapPin, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import JobActions from "../components/jobs/jobActions";

const statuses = ["PENDING", "INTERVIEW", "FOLLOW_UP", "ACCEPTED"];

const KanbanCard = ({ job }: { job: any }) => {
  return (
    <div className="group relative bg-card border border-border/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
      <div className={cn(
        "absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-gradient-to-b opacity-70",
        statusGradientColor(job.status)
      )} />
      
      <div className="pl-2 space-y-3">
        <div>
          <h4 className="font-black text-sm tracking-tight leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {job.title}
          </h4>
          <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-1">
            {job.company}
          </p>
        </div>

        <div className="flex flex-col gap-y-1">
          {job.location && (
            <div className="flex items-center gap-x-1.5 text-[10px] text-muted-foreground font-medium">
              <MapPin className="size-3 opacity-50" />
              <span className="truncate">{job.location}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/20">
          <span className="text-[10px] font-bold text-muted-foreground/40 italic">
            {job.candidacyDate ? new Date(job.candidacyDate).toLocaleDateString() : "--/--/--"}
          </span>
          <div className="flex items-center gap-1 scale-75 origin-right">
            <JobActions job={job} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Applications = () => {
  const { jobs, getJobs } = useJobStore();

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background transition-colors duration-300">
        <AppSidebar />
        <SidebarInset className="flex flex-col bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 sticky top-0 z-30 bg-background/50 backdrop-blur-xl border-b border-border/5 transition-all">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="size-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-all border border-border/40 shadow-sm" />
              <div className="h-4 w-px bg-border/40 mx-2" />
              <h2 className="text-sm font-black uppercase tracking-widest opacity-40">
                Candidatures (Kanban)
              </h2>
            </div>
          </header>

          <main className="flex-1 overflow-x-auto p-4 md:p-8">
            <div className="flex gap-6 min-h-[calc(100vh-10rem)] min-w-max pb-4">
              {statuses.map((status) => {
                const filteredJobs = jobs.filter((job) => job.status === status);
                return (
                  <div key={status} className="w-80 flex flex-col gap-y-4">
                    <div className="flex items-center justify-between px-2">
                      <div className="flex items-center gap-x-3">
                        <div className={cn(
                          "size-2.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]",
                          statusGradientColor(status)
                        )} />
                        <h3 className="font-black text-xs uppercase tracking-[0.2em] opacity-60">
                          {statusEnumToString(status)}
                        </h3>
                        <span className="bg-muted px-2 py-0.5 rounded-full text-[10px] font-black opacity-40">
                          {filteredJobs.length}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 bg-muted/20 rounded-[2rem] p-3 border border-border/5 space-y-3 overflow-y-auto max-h-[calc(100vh-14rem)] custom-scrollbar">
                      {filteredJobs.map((job) => (
                        <KanbanCard key={job.id} job={job} />
                      ))}
                      
                      {filteredJobs.length === 0 && (
                        <div className="h-24 border-2 border-dashed border-border/20 rounded-2xl flex items-center justify-center">
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-20">Aucun job</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Applications;
