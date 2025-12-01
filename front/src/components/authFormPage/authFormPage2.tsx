import {
  Controller,
  type Control,
  type RegisterOptions,
} from "react-hook-form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { statusEnumToString } from "../../api/config";

const AuthFormPage2 = ({
  register,
  control,
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
  control: Control;
}) => {
  return (
    <>
      <div className="flex space-x-1">
        <Input
          {...register("location")}
          type="text"
          placeholder="Lieu"
          className="w-full"
        />
        <Controller
          control={control}
          name="status"
          defaultValue="PENDING"
          rules={{ required: true }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full m-0">
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Statut</SelectLabel>
                  <SelectItem value="PENDING">
                    {statusEnumToString("PENDING")}
                  </SelectItem>
                  <SelectItem value="INTERVIEW">
                    {statusEnumToString("INTERVIEW")}
                  </SelectItem>
                  <SelectItem value="FOLLOW_UP">
                    {statusEnumToString("FOLLOW_UP")}
                  </SelectItem>
                  <SelectItem value="ACCEPTED">
                    {statusEnumToString("ACCEPTED")}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        ></Controller>
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
