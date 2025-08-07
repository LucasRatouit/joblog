import Company from "../components/company";
import InfoCard from "../components/infoCard";
import SearchBar from "../components/searchBar";

const Dashboard = () => {
  return (
    <div
      className="h-screen w-full pt-20 flex justify-center 
                    bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="max-w-[1200px] w-full flex flex-col gap-y-5">
        <InfoCard />
        <SearchBar />
        <Company />
      </div>
    </div>
  );
};

export default Dashboard;
