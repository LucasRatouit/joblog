import type { RegisterOptions } from "react-hook-form";
import { Input } from "../ui/input";

const authFormPage3 = ({
  register,
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
}) => {
  return (
    <>
      <Input
        {...register("candidacyDate", {
          valueAsDate: true,
          setValueAs: (value) => (value === "" ? null : value),
        })}
        type="date"
        placeholder="Date de candidature"
      />
      <Input
        {...register("interviewDate", {
          valueAsDate: true,
          setValueAs: (value) => (value === "" ? null : value),
        })}
        type="datetime-local"
        placeholder="Date d'entretien"
      />
      <Input
        {...register("followUpDate", {
          valueAsDate: true,
          setValueAs: (value) => (value === "" ? null : value),
        })}
        type="date"
        placeholder="Date de relance"
      />
    </>
  );
};

export default authFormPage3;
