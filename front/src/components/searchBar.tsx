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
import { Dialog } from "./ui/dialog";
import JobForm from "./jobForm";
import type { Job } from "../api/services/job";
import { useState } from "react";
import { statusEnumToString } from "../api/config";

const SearchBar = (props: {
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [AuthFormIsOpen, setAuthFormIsOpen] = useState(false);

  return (
    <Card className="border-0 px-2 py-2 flex flex-row gap-2">
      <Input
        className="w-full"
        placeholder="Rechercher par entreprise ou poste"
        onChange={(e) => props.setSearch(e.target.value)}
      />
      <Select
        defaultValue="*"
        onValueChange={(value) => props.setStatus(value)}
      >
        <SelectTrigger className="w-2/6">
          <SelectValue placeholder="Sélectionner un statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="*">Tous les statuts</SelectItem>
          <SelectItem value="PENDING">
            {statusEnumToString("PENDING")}
          </SelectItem>
          <SelectItem value="INTERVIEW">
            {statusEnumToString("INTERVIEW")}
          </SelectItem>
          <SelectItem value="FOLLOW_UP">
            {statusEnumToString("FOLLOW_UP")}
          </SelectItem>
          <SelectItem value="ACCEPTED">
            {statusEnumToString("ACCEPTED")}
          </SelectItem>
        </SelectContent>
      </Select>
      <Dialog open={AuthFormIsOpen} onOpenChange={setAuthFormIsOpen}>
        <Button
          className="min-w-min w-1/6 cursor-pointer"
          onClick={() => setAuthFormIsOpen(true)}
        >
          <Plus /> Nouvelle candidature
        </Button>
        <JobForm
          setJobs={props.setJobs}
          setAuthFormIsOpen={setAuthFormIsOpen}
        />
      </Dialog>
    </Card>
  );
};

export default SearchBar;
