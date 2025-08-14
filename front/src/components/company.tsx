import { Calendar, Clock, Eye, MapPin } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const Company = () => {
  return (
    <Card
      className="pl-6 pr-4 flex flex-row gap-x-2
    border-0 border-l-4 border-joblog-500"
    >
      <div className="w-full flex flex-col gap-y-3">
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl text-nowrap">Nom de l'entreprise</p>
          <div className="px-4 py-2 relative">
            <div className="z-0 opacity-25 w-full h-full bg-blue-700 rounded-full absolute left-0 top-0" />
            <div className="z-10 opacity-50 w-full h-full border-2 border-blue-500 rounded-full absolute left-0 top-0" />
            <span className="flex flex-nowrap items-center gap-x-2 text-sm">
              <Clock className="w-4 h-4" /> En attente
            </span>
          </div>
        </div>
        <p className="text-gray-400 font-medium text-nowrap flex gap-x-2 items-center">
          <MapPin className="w-4 h-4" /> Tours
        </p>
        <div className="z-10 grid gap-3 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-full py-2 flex gap-x-3 flex-wrap items-center rounded-lg relative"
            >
              <div className="-z-20 bg-green-400 opacity-15 w-full h-full rounded-lg absolute" />
              <Calendar className="text-green-400 w-5 h-5 ml-2" />
              <div className="flex flex-col">
                <p className="text-gray-400 text-nowrap text-[10px]">
                  Date de l'entretien
                </p>
                <span className="text-green-400 text-sm">12/12/2023</span>
              </div>
            </div>
          ))}
        </div>
        <p className="bg-zinc-800 text-gray-400 p-3 rounded-lg">Note</p>
      </div>
      <div className="flex flex-col">
        <Button variant="ghost" className="w-10 h-10">
          <Eye />
        </Button>
        <Button variant="ghost" className="w-10 h-10">
          <Eye />
        </Button>
        <Button variant="ghost" className="w-10 h-10">
          <Eye />
        </Button>
      </div>
    </Card>
  );
};

export default Company;
