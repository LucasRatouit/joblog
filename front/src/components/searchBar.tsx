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

const SearchBar = () => {
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
      <Button className="min-w-min w-1/6 cursor-pointer">
        <Plus /> Nouvelle candidature
      </Button>
    </Card>
  );
};

export default SearchBar;
