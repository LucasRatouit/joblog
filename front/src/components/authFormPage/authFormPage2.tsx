import type { RegisterOptions } from "react-hook-form";
import { Input } from "../ui/input";

const AuthFormPage2 = ({
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
      <div className="space-y-1">
        <Input {...register("location")} type="text" placeholder="Lieu" />
      </div>
      <div className="flex space-x-1">
        <Input {...register("email")} type="email" placeholder="Email" />
        <Input {...register("phone")} type="tel" placeholder="Téléphone" />
      </div>
      <div className="space-y-1"></div>
      <div className="space-y-1">
        <Input
          {...register("description")}
          type="text"
          placeholder="Description"
        />
      </div>

      {/* STATUS required */}
    </>
  );
};

export default AuthFormPage2;
