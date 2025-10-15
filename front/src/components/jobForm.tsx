import { useForm, type FieldValues } from "react-hook-form";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createJob, userJobs, type Job } from "../api/services/job";
import { toast } from "sonner";

const JobForm = (props: {
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}) => {
  const { register, handleSubmit } = useForm<FieldValues>();

  return (
    <DialogContent>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(async (data) => {
          await createJob(data).then(() => {
            userJobs().then((res) => {
              props.setJobs(res);
              toast.success("Poste créé avec succès");
            });
          });
        })}
      >
        <DialogHeader>
          <DialogTitle>Créer une offre</DialogTitle>
          <DialogDescription>
            Remplissez le formulaire pour créer une offre
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1">
          <Input
            {...register("title", { required: true })}
            type="text"
            placeholder="Titre du job"
          />
          <Input
            {...register("company", { required: true })}
            type="text"
            placeholder="Nom de l'entreprise"
          />
          <Input {...register("location")} type="text" placeholder="Lieu" />
          <Input
            {...register("description")}
            type="text"
            placeholder="Description"
          />
          <Input {...register("email")} type="email" placeholder="Email" />
          <Input {...register("phone")} type="tel" placeholder="Téléphone" />
          <Input
            {...register("candidacyDate", {
              setValueAs: (value) => (value === "" ? null : value),
            })}
            type="date"
            placeholder="Date de candidature"
          />
          <Input
            {...register("interviewDate", {
              setValueAs: (value) => (value === "" ? null : value),
            })}
            type="datetime-local"
            placeholder="Date d'entretien"
          />
          <Input
            {...register("followUpDate", {
              setValueAs: (value) => (value === "" ? null : value),
            })}
            type="date"
            placeholder="Date de relance"
          />
          {/* STATUS required */}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Créer</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default JobForm;
