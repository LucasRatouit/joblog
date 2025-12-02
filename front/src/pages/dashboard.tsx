import { useEffect, useState } from "react";
import InfoCardList from "../components/infoCard";
import SearchBar from "../components/searchBar";
import { type Job, userJobs } from "../api/services/job";
import Jobs from "../components/jobs";
import AppSidebar from "../components/app-sidebar";
import { Button } from "../components/ui/button";
import { PanelLeftOpen } from "lucide-react";
import { useSidebar } from "../components/ui/sidebar";

const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState<string>("");
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    userJobs({ search }).then((res) => {
      setJobs(res);
    });
  }, [search]);

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
        <InfoCardList jobs={jobs} />
        <SearchBar setJobs={setJobs} setSearch={setSearch} />
        <Jobs jobs={jobs} setJobs={setJobs} />
      </div>
    </div>
  );
};

export default Dashboard;
