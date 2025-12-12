import { useEffect } from "react";
import InfoCardList from "../components/infoCard";
import SearchBar from "../components/searchBar";
import Jobs from "../components/jobs/jobs";
import AppSidebar from "../components/app-sidebar";
import { Button } from "../components/ui/button";
import { PanelLeftOpen } from "lucide-react";
import { useSidebar } from "../components/ui/sidebar";
import { useJobStore } from "../stores/job";

const Dashboard = () => {
  const { toggleSidebar } = useSidebar();

  const { getJobs, search, status, getJobsFiltered } = useJobStore();
  // Améliorer createJob sur jobStore, pour mettre à jour 'jobs' et 'jobsFiltered' sans requêter à nouveau tout les jobs

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    getJobsFiltered(search, status);
  }, [search, status]);

  return (
    <div
      className="h-screen w-full pt-4 flex justify-center relative
               bg-neutral-100 dark:bg-background"
    >
      <AppSidebar />
      <Button className="absolute top-4 left-4" onClick={toggleSidebar}>
        <PanelLeftOpen />
      </Button>
      <div className="max-w-[1200px] w-full mx-3 flex flex-col gap-y-4">
        <InfoCardList />
        <SearchBar />
        {/* Dans 'Jobs'>'jobActions' voir la feature mis en commentaire */}
        <Jobs />
        {/* Ajouter une information quand aucun job est trouvé */}
      </div>
    </div>
  );
};

export default Dashboard;
