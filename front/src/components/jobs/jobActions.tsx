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

const JobActions = ({ job }: { job: Job }) => {
  const { deleteJob } = useJobStore();

  return (
    <div className="flex flex-col gap-y-1 justify-center">
      <Button disabled variant="ghost" className="w-10 h-10 cursor-pointer">
        <SquarePen />
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            disabled={!job.description}
            variant="ghost"
            className="w-10 h-10 cursor-pointer"
          >
            <Info />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Détails de l'offre</DialogTitle>
            <DialogDescription>
              Information sur l'offre d'emploi
            </DialogDescription>
          </DialogHeader>
          <hr />
          <p className="whitespace-pre-wrap max-h-[80vh] overflow-y-auto">
            {job.description}
          </p>
        </DialogContent>
      </Dialog>
      <Button
        disabled={!job.redirectUrl}
        variant="ghost"
        className="w-10 h-10 cursor-pointer"
        onClick={() => {
          if (job.redirectUrl) {
            window.open(job.redirectUrl, "_blank");
          }
        }}
      >
        <ExternalLink />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-10 h-10 cursor-pointer">
            <Trash2 />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l'offre</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cette offre ? Cette action est
              irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">Annuler</Button>
            </AlertDialogCancel>
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={() => {
                deleteJob(job.id);
              }}
            >
              Supprimer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default JobActions;
