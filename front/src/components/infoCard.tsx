import { LogOut } from "lucide-react";

const InfoCard = () => {
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="bg-card w-full min-w-2 grow shrink px-8 py-4 flex justify-between items-center rounded-lg shadow-lg border-b-4 border-joblog-500"
        >
          <div className="flex flex-col">
            <p className="text-gray-400 font-medium text-sm">Total</p>
            <span className="font-semibold text-3xl">9</span>
          </div>
          <div className="bg-joblog-500 w-min h-min p-3 rounded-lg">
            <LogOut />
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoCard;
