import { useEffect } from "react";
import InfoCardList from "../components/infoCard";
import SearchBar from "../components/searchBar";
import Jobs from "../components/jobs/jobs";
import AppSidebar from "../components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { useJobStore } from "../stores/job";

/**
 * Dashboard page component.
 * Displays job statistics, search bar, and the list of job applications.
 *
 * @returns {JSX.Element} The rendered dashboard page
 */
const Dashboard = (): JSX.Element => {
  const { getJobs, search, status, getJobsFiltered } = useJobStore();

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  useEffect(() => {
    getJobsFiltered(search, status);
  }, [search, status, getJobsFiltered]);

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
                Vue d'ensemble
              </h2>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-4 md:pt-4">
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <InfoCardList />
              
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-black tracking-tighter">Mes Candidatures</h1>
                    <p className="text-muted-foreground text-sm font-medium">Suivez et gérez vos opportunités en temps réel.</p>
                  </div>
                </div>
                
                <SearchBar />
                <Jobs />
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
