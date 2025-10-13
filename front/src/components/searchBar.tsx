import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Dialog, DialogTrigger } from "./ui/dialog";
import JobForm from "./jobForm";
import type { Job } from "../api/services/job";

const SearchBar = (props: {
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}) => {
  return (
    <Card className="border-0 px-2 py-2 flex flex-row gap-2">
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
      <Dialog>
        <DialogTrigger asChild>
          <Button className="min-w-min w-1/6 cursor-pointer">
            <Plus /> Nouvelle candidature
          </Button>
        </DialogTrigger>
        <JobForm setJobs={props.setJobs} />
      </Dialog>
    </Card>
  );
};

export default SearchBar;
