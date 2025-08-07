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
  );
};

export default SearchBar;
