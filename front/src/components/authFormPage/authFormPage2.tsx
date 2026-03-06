import {
  Controller,
  type Control,
  type UseFormRegister,
  type FieldValues,
} from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { statusEnumToString } from "../../api/config";

interface AuthFormPage2Props {
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
}

/**
 * Step 2 of the job application form.
 * Captures location, status, contact info, and comments.
 *
 * @param {AuthFormPage2Props} props - Component properties
 * @returns {JSX.Element} The rendered form page
 */
const AuthFormPage2 = ({
  register,
  control,
}: AuthFormPage2Props): JSX.Element => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 pl-1">Lieu</Label>
          <Input
            {...register("location")}
            id="location"
            type="text"
            placeholder="ex: Paris, Remote..."
            className="h-12 bg-muted/30 border-border/40 rounded-xl font-bold"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 pl-1">Statut actuel</Label>
          <Controller
            control={control}
            name="status"
            defaultValue="PENDING"
            rules={{ required: true }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger id="status" className="h-12 bg-muted/30 border-border/40 rounded-xl font-bold">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/40 shadow-xl">
                  <SelectItem value="PENDING" className="font-bold text-xs uppercase tracking-widest">{statusEnumToString("PENDING")}</SelectItem>
                  <SelectItem value="INTERVIEW" className="font-bold text-xs uppercase tracking-widest">{statusEnumToString("INTERVIEW")}</SelectItem>
                  <SelectItem value="FOLLOW_UP" className="font-bold text-xs uppercase tracking-widest">{statusEnumToString("FOLLOW_UP")}</SelectItem>
                  <SelectItem value="ACCEPTED" className="font-bold text-xs uppercase tracking-widest">{statusEnumToString("ACCEPTED")}</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 pl-1">Email de contact</Label>
          <Input 
            {...register("email")} 
            id="email"
            type="email" 
            placeholder="rh@entreprise.com" 
            className="h-12 bg-muted/30 border-border/40 rounded-xl font-bold"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 pl-1">Téléphone</Label>
          <Input 
            {...register("phone")} 
            id="phone"
            type="tel" 
            placeholder="06 .. .. .. .." 
            className="h-12 bg-muted/30 border-border/40 rounded-xl font-bold"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="redirectUrl" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 pl-1">Lien de l'offre</Label>
        <Input
          {...register("redirectUrl")}
          id="redirectUrl"
          type="url"
          placeholder="https://linkedin.com/jobs/..."
          className="h-12 bg-muted/30 border-border/40 rounded-xl font-bold"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 pl-1">Note personnelle</Label>
        <Input 
          {...register("comment")} 
          id="comment"
          type="text" 
          placeholder="ex: Relance prévue dans 2 jours..." 
          className="h-12 bg-muted/30 border-border/40 rounded-xl font-bold"
        />
      </div>
    </div>
  );
};

export default AuthFormPage2;
