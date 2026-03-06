import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
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
import { useState } from "react";
import { statusEnumToString } from "../api/config";
import { useJobStore } from "../stores/job";

/**
 * Search and filter bar for the jobs list.
 * Includes a search input, status filter, and a button to add new jobs.
 *
 * @returns {JSX.Element} The rendered search bar component
 */
const SearchBar = (): JSX.Element => {
  const [AuthFormIsOpen, setAuthFormIsOpen] = useState<boolean>(false);
  const { updateSearch, updateStatus } = useJobStore();

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-150">
      <div className="relative flex-1 w-full group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          className="w-full h-14 pl-12 bg-card border-border/40 rounded-2xl shadow-sm focus:ring-primary/20 transition-all text-base font-medium"
          placeholder="Rechercher une entreprise, un poste..."
          onChange={(e) => updateSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative min-w-[200px] flex-1 md:flex-none">
          <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none z-10" />
          <Select defaultValue="*" onValueChange={(value) => updateStatus(value)}>
            <SelectTrigger className="h-14 pl-12 bg-card border-border/40 rounded-2xl shadow-sm focus:ring-primary/20 font-bold text-xs uppercase tracking-widest">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-border/40 shadow-2xl">
              <SelectItem value="*" className="rounded-lg font-bold text-xs uppercase tracking-widest">Tous les statuts</SelectItem>
              <SelectItem value="PENDING" className="rounded-lg font-bold text-xs uppercase tracking-widest">
                {statusEnumToString("PENDING")}
              </SelectItem>
              <SelectItem value="INTERVIEW" className="rounded-lg font-bold text-xs uppercase tracking-widest">
                {statusEnumToString("INTERVIEW")}
              </SelectItem>
              <SelectItem value="FOLLOW_UP" className="rounded-lg font-bold text-xs uppercase tracking-widest">
                {statusEnumToString("FOLLOW_UP")}
              </SelectItem>
              <SelectItem value="ACCEPTED" className="rounded-lg font-bold text-xs uppercase tracking-widest">
                {statusEnumToString("ACCEPTED")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={AuthFormIsOpen} onOpenChange={setAuthFormIsOpen}>
          <Button
            size="lg"
            className="h-14 px-8 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all gap-x-2"
            onClick={() => setAuthFormIsOpen(true)}
          >
            <Plus className="size-5" />
            <span className="hidden sm:inline">Nouvelle candidature</span>
          </Button>
          <JobForm setAuthFormIsOpen={setAuthFormIsOpen} />
        </Dialog>
      </div>
    </div>
  );
};

export default SearchBar;
