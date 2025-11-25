import { useForm, type FieldValues } from "react-hook-form";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { createJob, userJobs, type Job } from "../api/services/job";
import { toast } from "sonner";
import { useState } from "react";
import AuthFormPage1 from "./authFormPage/authFormPage1";
import AuthFormPage2 from "./authFormPage/authFormPage2";
import AuthFormPage3 from "./authFormPage/authFormPage3";

const JobForm = (props: {
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  setAuthFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { register, handleSubmit, reset } = useForm<FieldValues>();
  const [numPageForm, setNumPageForm] = useState<number>(1);
  const [requiredData, setRequiredData] = useState<{
    title: string;
    company: string;
  }>({ title: "", company: "" });

  return (
    <DialogContent>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(async (data) => {
          await createJob(data).then(() => {
            userJobs().then((res) => {
              props.setJobs(res);
              props.setAuthFormIsOpen(false);
              reset();
              setNumPageForm(1);
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
        <div className="space-y-2">
          {numPageForm === 1 && (
            <AuthFormPage1
              register={register}
              requiredData={requiredData}
              setRequiredData={setRequiredData}
            />
          )}
          {numPageForm === 2 && <AuthFormPage2 register={register} />}
          {numPageForm === 3 && <AuthFormPage3 register={register} />}
        </div>
        <DialogFooter className="justify-between! items-end">
          <div className="text-muted-foreground">{numPageForm}/3</div>
          <div className="flex gap-x-2">
            {numPageForm < 3 && (
              <Button type="submit" className="cursor-pointer">
                Passer et créer l'offre
              </Button>
            )}
            {numPageForm > 1 && (
              <Button
                type="button"
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setNumPageForm(numPageForm - 1)}
              >
                Précedent
              </Button>
            )}
            {numPageForm < 3 && (
              <Button
                type="button"
                variant="secondary"
                disabled={
                  requiredData.title === "" || requiredData.company === ""
                }
                className="cursor-pointer"
                onClick={() => setNumPageForm(numPageForm + 1)}
              >
                Suivant
              </Button>
            )}
            {numPageForm === 3 && (
              <Button type="submit" className="cursor-pointer">
                Créer l'offre
              </Button>
            )}
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default JobForm;
