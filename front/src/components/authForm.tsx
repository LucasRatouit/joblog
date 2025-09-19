import { toast } from "sonner";
import { userLogin, userRegister } from "../api/services/user";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm, type FieldValues } from "react-hook-form";
import { useState } from "react";

const AuthForm = (props: {
  title: string;
  description: string;
  submitText: string;
  isLogin: boolean;
}) => {
  const { register, handleSubmit } = useForm<FieldValues>();
  const [error, setError] = useState("");

  return (
    <DialogContent className="bg-card">
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          if (props.isLogin) {
            await userLogin(data.email, data.password)
              .then(() => {
                window.location.href = "/dashboard";
              })
              .catch(function (err) {
                setError(err.response.data.error);
                toast.error(err.response.data.message);
              });
          } else {
            await userRegister(data.email, data.password)
              .then(() => {
                window.location.href = "/dashboard";
              })
              .catch(function (err) {
                setError(err.response.data.error);
                toast.error(err.response.data.message);
              });
          }
        })}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email", { required: true })}
            type="email"
            id="email"
            placeholder="votre@email.com"
            className={error === "email" ? "border-red-400! border-2!" : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            {...register("password", { required: true })}
            type="password"
            id="password"
            placeholder="••••••••"
            className={error === "password" ? "border-red-400! border-2!" : ""}
          />
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full cursor-pointer">
            {props.submitText}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default AuthForm;
