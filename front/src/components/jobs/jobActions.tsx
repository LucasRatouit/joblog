import { SquarePen, ExternalLink, Trash2, Info } from "lucide-react";
import { type Job } from "../../api/services/job";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useJobStore } from "../../stores/job";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useState } from "react";
import JobForm from "../jobForm";

/**
 * Action buttons for a job application card.
 * Includes edit, info, external link, and delete actions.
 *
 * @param {Object} props - Component properties
 * @param {Job} props.job - The job object to perform actions on
 * @returns {JSX.Element} The rendered action buttons
 */
const JobActions = ({ job }: { job: Job }): JSX.Element => {
  const { deleteJob } = useJobStore();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const actionButtons = [
    {
      icon: SquarePen,
      label: "Modifier",
      disabled: false,
      isEditDialog: true,
      variant: "ghost" as const,
    },
    {
      icon: Info,
      label: "Détails",
      disabled: !job.description,
      isInfoDialog: true,
      variant: "ghost" as const,
    },
    {
      icon: ExternalLink,
      label: "Voir l'offre",
      disabled: !job.redirectUrl,
      onClick: () => job.redirectUrl && window.open(job.redirectUrl, "_blank"),
      variant: "ghost" as const,
    },
  ];

  return (
    <div className="flex flex-row md:flex-col gap-2 items-center justify-center">
      {actionButtons.map((btn, i) => (
        <Tooltip key={i}>
          {btn.isInfoDialog ? (
            <Dialog>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    disabled={btn.disabled}
                    variant={btn.variant}
                    size="icon"
                    className="size-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all shadow-sm border border-transparent hover:border-primary/20"
                  >
                    <btn.icon className="size-5" />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <DialogContent className="max-w-2xl rounded-3xl border-border/40 shadow-2xl overflow-hidden p-0">
                <DialogHeader className="p-8 pb-4 bg-muted/20">
                  <DialogTitle className="text-2xl font-black tracking-tighter">Détails de l'offre</DialogTitle>
                  <DialogDescription className="font-bold text-xs uppercase tracking-widest opacity-60">
                    Information sur l'offre d'emploi
                  </DialogDescription>
                </DialogHeader>
                <div className="p-8 pt-4">
                  <div className="max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed font-medium text-foreground/80">
                      {job.description}
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ) : btn.isEditDialog ? (
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    disabled={btn.disabled}
                    variant={btn.variant}
                    size="icon"
                    className="size-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all shadow-sm border border-transparent hover:border-primary/20"
                  >
                    <btn.icon className="size-5" />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <JobForm setAuthFormIsOpen={setIsEditDialogOpen} job={job} />
            </Dialog>
          ) : (
            <>
              <TooltipTrigger asChild>
                <Button
                  disabled={btn.disabled}
                  variant={btn.variant}
                  size="icon"
                  className="size-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all shadow-sm border border-transparent hover:border-primary/20"
                  onClick={btn.onClick}
                >
                  <btn.icon className="size-5" />
                </Button>
              </TooltipTrigger>
            </>
          )}
          <TooltipContent side="left" className="font-bold text-[10px] uppercase tracking-widest rounded-lg">
            {btn.label}
          </TooltipContent>
        </Tooltip>
      ))}

      <AlertDialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-10 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive transition-all shadow-sm border border-transparent hover:border-destructive/20"
              >
                <Trash2 className="size-5" />
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-destructive text-destructive-foreground font-bold text-[10px] uppercase tracking-widest rounded-lg">
            Supprimer
          </TooltipContent>
        </Tooltip>
        <AlertDialogContent className="rounded-3xl border-border/40 shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-black tracking-tighter">Supprimer l'offre</AlertDialogTitle>
            <AlertDialogDescription className="font-medium">
              Êtes-vous sûr de vouloir supprimer cette offre ? Cette action est
              irréversible et toutes les données associées seront perdues.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 mt-6">
            <AlertDialogCancel asChild>
              <Button variant="outline" className="rounded-xl font-bold uppercase tracking-widest text-xs h-11 px-6">Annuler</Button>
            </AlertDialogCancel>
            <Button
              variant="destructive"
              className="rounded-xl font-black uppercase tracking-widest text-xs h-11 px-6 shadow-lg shadow-destructive/20 hover:shadow-destructive/30"
              onClick={() => deleteJob(job.id)}
            >
              Supprimer l'offre
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default JobActions;
