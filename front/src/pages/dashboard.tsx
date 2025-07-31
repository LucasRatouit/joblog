import { LogOut, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const Dashboard = () => {
  return (
    <div
      className="h-screen w-full pt-20 flex justify-center 
                    bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="max-w-[1200px] w-full flex flex-col gap-y-5">
        <div className="flex gap-x-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="bg-card w-full px-8 py-4 flex justify-between items-center rounded-lg shadow-lg border-b-4 border-joblog-500"
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
        <Card className="px-3 py-3 flex flex-row">
          <Input
            className="w-full"
            placeholder="Rechercher par entreprise ou poste"
          />
          <Select>
            <SelectTrigger className="w-2/6">
              <SelectValue placeholder="Sélectionner une option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
          <Button className="w-1/6">
            <Plus /> Nouvelle candidature
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
