import { useForm, type FieldValues } from "react-hook-form";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import AuthFormPage1 from "./authFormPage/authFormPage1";
import AuthFormPage2 from "./authFormPage/authFormPage2";
import AuthFormPage3 from "./authFormPage/authFormPage3";
import { useJobStore } from "../stores/job";
import { Loader2, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { cn } from "../lib/utils";
import type { Job } from "../api/services/job";

interface JobFormProps {
  setAuthFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  job?: Job;
}

/**
 * Multi-step form for creating or editing a job application.
 *
 * @param {JobFormProps} props - Component properties
 * @returns {JSX.Element} The rendered job form dialog content
 */
const JobForm = ({ setAuthFormIsOpen, job }: JobFormProps): JSX.Element => {
  const isEditing = !!job;
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: job
      ? {
          ...job,
          candidacyDate: job.candidacyDate
            ? new Date(job.candidacyDate).toISOString().split("T")[0]
            : undefined,
          interviewDate: job.interviewDate
            ? new Date(job.interviewDate).toISOString().slice(0, 16)
            : undefined,
          followUpDate: job.followUpDate
            ? new Date(job.followUpDate).toISOString().split("T")[0]
            : undefined,
        }
      : {},
  });

  const [numPageForm, setNumPageForm] = useState<number>(1);
  const { createJob, updateJob } = useJobStore();

  const titleValue = watch("title");
  const companyValue = watch("company");

  const onSubmit = async (data: FieldValues): Promise<void> => {
    try {
      if (isEditing && job) {
        await updateJob(job.id, data);
        toast.success("Candidature mise à jour !");
      } else {
        await createJob(data);
        toast.success("Candidature ajoutée avec succès !");
      }
      setAuthFormIsOpen(false);
      reset();
      setNumPageForm(1);
    } catch (error) {
      toast.error(
        isEditing
          ? "Erreur lors de la modification."
          : "Erreur lors de l'ajout.",
      );
      console.error(error);
    }
  };

  const isNextDisabled = !titleValue || !companyValue;

  return (
    <DialogContent className="sm:max-w-[500px] bg-card border-border/40 shadow-2xl rounded-[2.5rem] p-0 overflow-hidden backdrop-blur-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
        <DialogHeader className="p-8 pb-4 bg-muted/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-1.5">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    numPageForm === step
                      ? "w-8 bg-primary"
                      : "w-1.5 bg-primary/20",
                  )}
                />
              ))}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              Étape {numPageForm} sur 3
            </span>
          </div>
          <DialogTitle className="text-3xl font-black tracking-tighter">
            {isEditing ? "Modifier l'offre" : "Nouvelle Opportunité"}
          </DialogTitle>
          <DialogDescription className="font-bold text-xs uppercase tracking-widest opacity-60">
            {isEditing
              ? "Mettez à jour les détails de votre candidature"
              : "Remplissez les détails pour suivre votre candidature"}
          </DialogDescription>
        </DialogHeader>

        <div className="p-8 py-6 space-y-6">
          <div className="min-h-[200px] animate-in fade-in slide-in-from-right-4 duration-500">
            {numPageForm === 1 && <AuthFormPage1 register={register} />}
            {numPageForm === 2 && (
              <AuthFormPage2 register={register} control={control} />
            )}
            {numPageForm === 3 && <AuthFormPage3 register={register} />}
          </div>
        </div>

        <DialogFooter className="p-8 pt-4 bg-muted/10 border-t border-border/20 flex sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-2 w-full justify-between">
            {numPageForm > 1 ? (
              <Button
                type="button"
                variant="outline"
                className="h-12 px-6 rounded-2xl font-bold uppercase tracking-widest text-xs gap-x-2 transition-all"
                onClick={() => setNumPageForm(numPageForm - 1)}
                disabled={isSubmitting}
              >
                <ArrowLeft className="size-4" />
                Précédent
              </Button>
            ) : (
              <div /> // Spacer for alignment
            )}

            <div className="flex gap-2">
              {numPageForm < 3 ? (
                <>
                  <Button
                    type="submit"
                    variant="ghost"
                    className="h-12 px-6 rounded-2xl font-bold uppercase tracking-widest text-[10px] opacity-50 hover:opacity-100"
                    disabled={isSubmitting || isNextDisabled}
                  >
                    Passer et {isEditing ? "modifier" : "créer"}
                  </Button>
                  <Button
                    type="button"
                    disabled={isNextDisabled || isSubmitting}
                    className="h-12 px-8 rounded-2xl font-black uppercase tracking-widest text-xs gap-x-2 shadow-xl shadow-primary/20 transition-all group"
                    onClick={() => setNumPageForm(numPageForm + 1)}
                  >
                    Suivant
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 px-8 rounded-2xl font-black uppercase tracking-widest text-xs gap-x-2 shadow-xl shadow-primary/20 transition-all"
                >
                  {isSubmitting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      {isEditing ? "Modifier" : "Créer"} l'offre
                      <CheckCircle2 className="size-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default JobForm;
