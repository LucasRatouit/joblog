import type { RegisterOptions } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const AuthFormPage1 = ({
  register,
  setRequiredData,
  requiredData,
}: {
  register: (
    name: string,
    options?: RegisterOptions
  ) => {
    ref: (instance: HTMLInputElement | null) => void;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  };
  setRequiredData: React.Dispatch<
    React.SetStateAction<{ title: string; company: string }>
  >;
  requiredData: { title: string; company: string };
}) => {
  return (
    <>
      <div className="space-y-1">
        <Label>Titre</Label>
        <Input
          {...register("title", { required: true })}
          type="text"
          placeholder="Titre du job"
          onChange={(e) =>
            setRequiredData({ ...requiredData, title: e.target.value })
          }
        />
      </div>
      <div className="space-y-1">
        <Label>Entreprise</Label>
        <Input
          {...register("company", { required: true })}
          type="text"
          placeholder="Nom de l'entreprise"
          onChange={(e) =>
            setRequiredData({
              ...requiredData,
              company: e.target.value,
            })
          }
        />
      </div>
    </>
  );
};

export default AuthFormPage1;
