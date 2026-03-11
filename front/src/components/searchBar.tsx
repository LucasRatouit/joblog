import { Plus, Search, SlidersHorizontal, X, Command } from "lucide-react";
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
import { useState, useEffect, useRef } from "react";
import { statusEnumToString } from "../api/config";
import { useJobStore } from "../stores/job";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";

/**
 * Search and filter bar for the jobs list.
 * Includes a search input, status filter, and a button to add new jobs.
 *
 * @returns {JSX.Element} The rendered search bar component
 */
const SearchBar = (): JSX.Element => {
  const [isJobFormOpen, setIsJobFormOpen] = useState<boolean>(false);
  const { search, status, updateSearch, updateStatus, jobsFiltered } =
    useJobStore();
  const [localSearch, setLocalSearch] = useState(search);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search update to store
  useEffect(() => {
    const timer = setTimeout(() => {
      updateSearch(localSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, updateSearch]);

  // Sync local search with store (useful for resets)
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  // Keyboard shortcut (CMD/CTRL + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const hasFilters = search !== "" || status !== "*";

  const resetFilters = () => {
    setLocalSearch("");
    updateStatus("*");
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-150">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            ref={inputRef}
            className="w-full h-14 pl-12 pr-12 bg-card border-border/40 rounded-2xl shadow-sm focus:ring-primary/20 transition-all text-base font-medium placeholder:text-muted-foreground/50"
            placeholder="Rechercher une entreprise, un poste..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
          {localSearch && (
            <button
              onClick={() => setLocalSearch("")}
              className="absolute right-14 top-1/2 -translate-y-1/2 size-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg border border-border/40 bg-muted/50 text-[10px] font-bold text-muted-foreground select-none pointer-events-none">
            <Command className="size-2.5" />
            <span>K</span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative min-w-[200px] flex-1 md:flex-none group">
            <SlidersHorizontal
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 size-4 transition-colors pointer-events-none z-10",
                status !== "*" ? "text-primary" : "text-muted-foreground",
              )}
            />
            <Select
              value={status}
              onValueChange={(value) => updateStatus(value)}
            >
              <SelectTrigger
                className={cn(
                  "h-14 pl-12 bg-card border-border/40 rounded-2xl shadow-sm focus:ring-primary/20 font-bold text-xs uppercase tracking-widest transition-all",
                  status !== "*" && "border-primary/20 bg-primary/5",
                )}
              >
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-border/40 shadow-2xl backdrop-blur-xl">
                <SelectItem
                  value="*"
                  className="rounded-lg font-bold text-xs uppercase tracking-widest"
                >
                  Tous les statuts
                </SelectItem>
                <SelectItem
                  value="PENDING"
                  className="rounded-lg font-bold text-xs uppercase tracking-widest"
                >
                  {statusEnumToString("PENDING")}
                </SelectItem>
                <SelectItem
                  value="INTERVIEW"
                  className="rounded-lg font-bold text-xs uppercase tracking-widest"
                >
                  {statusEnumToString("INTERVIEW")}
                </SelectItem>
                <SelectItem
                  value="FOLLOW_UP"
                  className="rounded-lg font-bold text-xs uppercase tracking-widest"
                >
                  {statusEnumToString("FOLLOW_UP")}
                </SelectItem>
                <SelectItem
                  value="ACCEPTED"
                  className="rounded-lg font-bold text-xs uppercase tracking-widest"
                >
                  {statusEnumToString("ACCEPTED")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Dialog open={isJobFormOpen} onOpenChange={setIsJobFormOpen}>
            <Button
              size="lg"
              className="h-14 px-8 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all gap-x-2 bg-primary hover:bg-primary/90"
              onClick={() => setIsJobFormOpen(true)}
            >
              <Plus className="size-5" />
              <span className="hidden sm:inline">Nouvelle candidature</span>
            </Button>
            <JobForm setIsJobFormOpen={setIsJobFormOpen} />
          </Dialog>
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="rounded-full px-3 py-1 bg-muted/30 border-border/40 font-bold text-[10px] uppercase tracking-wider text-muted-foreground"
          >
            {jobsFiltered.length}{" "}
            {jobsFiltered.length > 1 ? "Résultats" : "Résultat"}
          </Badge>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-7 px-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/5 rounded-lg"
            >
              Réinitialiser les filtres
            </Button>
          )}
        </div>

        {search && (
          <p className="text-[10px] font-medium text-muted-foreground hidden sm:block">
            Recherche pour{" "}
            <span className="text-foreground font-bold">"{search}"</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
