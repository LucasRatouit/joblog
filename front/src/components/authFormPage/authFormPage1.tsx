import type { UseFormRegister, FieldValues } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface AuthFormPage1Props {
  register: UseFormRegister<FieldValues>;
}

/**
 * Step 1 of the job application form.
 * Captures the job title and company name.
 *
 * @param {AuthFormPage1Props} props - Component properties
 * @returns {JSX.Element} The rendered form page
 */
const AuthFormPage1 = ({
  register,
}: AuthFormPage1Props): JSX.Element => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label 
          htmlFor="title" 
          className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 pl-1"
        >
          Poste recherché
        </Label>
        <Input
          {...register("title", { required: true })}
          id="title"
          type="text"
          placeholder="ex: Développeur Fullstack"
          className="h-12 bg-muted/30 border-border/40 rounded-xl focus:ring-primary/20 transition-all font-bold"
        />
      </div>
      <div className="space-y-2">
        <Label 
          htmlFor="company" 
          className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 pl-1"
        >
          Entreprise
        </Label>
        <Input
          {...register("company", { required: true })}
          id="company"
          type="text"
          placeholder="ex: Google, Startup..."
          className="h-12 bg-muted/30 border-border/40 rounded-xl focus:ring-primary/20 transition-all font-bold"
        />
      </div>
    </div>
  );
};

export default AuthFormPage1;
