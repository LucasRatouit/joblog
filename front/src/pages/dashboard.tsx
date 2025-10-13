import { useEffect, useState } from "react";
import InfoCardList from "../components/infoCard";
import SearchBar from "../components/searchBar";
import { type Job, userJobs } from "../api/services/job";
import Jobs from "../components/jobs";
import { Button } from "../components/ui/button";
import { SunMoon } from "lucide-react";
import { useTheme } from "../components/theme-provider";

const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    userJobs().then((data) => {
      setJobs(data);
    });
  }, []);

  const { theme, setTheme } = useTheme();

  return (
    <div
      className="h-screen w-full pt-20 flex justify-center 
               bg-neutral-100 dark:bg-background relative"
    >
      <Button
        variant="ghost"
        className="text-secondary-foreground absolute top-5 right-5"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <SunMoon />
      </Button>
      <div className="max-w-[1200px] w-full mx-3 flex flex-col gap-y-4">
        <InfoCardList jobs={jobs} />
        <SearchBar setJobs={setJobs} />
        <Jobs jobs={jobs} />
      </div>
    </div>
  );
};

export default Dashboard;
