import type { UseFormRegister, FieldValues } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface AuthFormPage3Props {
  register: UseFormRegister<FieldValues>;
}

/**
 * Step 3 of the job application form.
 * Captures key dates: candidacy, interview, and follow-up.
 *
 * @param {AuthFormPage3Props} props - Component properties
 * @returns {JSX.Element} The rendered form page
 */
const AuthFormPage3 = ({ register }: AuthFormPage3Props): JSX.Element => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="candidacyDate" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 pl-1">Date de candidature</Label>
        <Input
          {...register("candidacyDate", {
            valueAsDate: true,
            setValueAs: (value) => (value === "" ? null : value),
          })}
          id="candidacyDate"
          type="date"
          className="h-12 bg-muted/30 border-border/40 rounded-xl font-bold"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="interviewDate" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 pl-1">Date d'entretien</Label>
        <Input
          {...register("interviewDate", {
            valueAsDate: true,
            setValueAs: (value) => (value === "" ? null : value),
          })}
          id="interviewDate"
          type="datetime-local"
          className="h-12 bg-muted/30 border-border/40 rounded-xl font-bold"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="followUpDate" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 pl-1">Date de relance prévue</Label>
        <Input
          {...register("followUpDate", {
            valueAsDate: true,
            setValueAs: (value) => (value === "" ? null : value),
          })}
          id="followUpDate"
          type="date"
          className="h-12 bg-muted/30 border-border/40 rounded-xl font-bold"
        />
      </div>
    </div>
  );
};

export default AuthFormPage3;
