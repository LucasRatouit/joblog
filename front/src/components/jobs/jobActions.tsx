import { SquarePen, ExternalLink, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteJob, type Job } from "../../api/services/job";
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

const JobActions = ({
  job,
  jobs,
  setJobs,
}: {
  job: Job;
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}) => {
  return (
    <>
      <div className="flex flex-col gap-y-2 justify-center">
        <Button disabled variant="ghost" className="w-10 h-10 cursor-pointer">
          <SquarePen />
        </Button>
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
        {/* Détail de l'offre lié au site d'emploi grâce à un bouton */}
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
                Êtes-vous sûr de vouloir supprimer cette offre ? Cette action
                est irréversible.
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
                  deleteJob(job.id).then(() => {
                    setJobs(jobs.filter((jobItem) => jobItem.id !== job.id));
                    toast.success("Job supprimé !");
                  });
                }}
              >
                Supprimer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default JobActions;
