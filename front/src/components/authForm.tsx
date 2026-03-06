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
import { Eye, EyeOff, Loader2 } from "lucide-react";

interface AuthFormProps {
  title: string;
  description: string;
  submitText: string;
  isLogin: boolean;
}

/**
 * Authentication form component for login and registration.
 *
 * @param props - Component properties
 * @returns {JSX.Element} The rendered authentication form
 */
const AuthForm = ({
  title,
  description,
  submitText,
  isLogin,
}: AuthFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  /**
   * Handles form submission.
   *
   * @param data - Form data containing email and password
   */
  const onSubmit = async (data: FieldValues): Promise<void> => {
    try {
      if (isLogin) {
        await userLogin(data.email, data.password);
      } else {
        await userRegister(data.email, data.password);
      }
      toast.success(
        isLogin ? "Connexion réussie !" : "Inscription réussie !"
      );
      // Small delay to let the toast be seen before redirect
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Une erreur est survenue lors de l'authentification.";
      toast.error(errorMessage);
    }
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  return (
    <DialogContent className="sm:max-w-[400px] bg-card border-border/50 shadow-2xl backdrop-blur-xl">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-3xl font-black tracking-tighter">
            {title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-medium">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-xs font-black uppercase tracking-widest opacity-70"
            >
              Email
            </Label>
            <Input
              {...register("email", {
                required: "L'email est requis",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Adresse email invalide",
                },
              })}
              type="email"
              id="email"
              placeholder="votre@email.com"
              aria-invalid={!!errors.email}
              className={`h-12 bg-muted/30 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl ${
                errors.email ? "border-destructive/50 ring-destructive/20" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-[10px] font-black uppercase tracking-widest text-destructive mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-xs font-black uppercase tracking-widest opacity-70"
            >
              Mot de passe
            </Label>
            <div className="relative">
              <Input
                {...register("password", {
                  required: "Le mot de passe est requis",
                  minLength: {
                    value: 6,
                    message: "Le mot de passe doit faire au moins 6 caractères",
                  },
                })}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                aria-invalid={!!errors.password}
                className={`h-12 bg-muted/30 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl pr-12 ${
                  errors.password
                    ? "border-destructive/50 ring-destructive/20"
                    : ""
                }`}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                disabled={isSubmitting}
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-[10px] font-black uppercase tracking-widest text-destructive mt-1">
                {errors.password.message as string}
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-4">
          <Button
            type="submit"
            className="w-full h-12 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all group"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              submitText
            )}
          </Button>

          <p className="text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">
            {isLogin
              ? "En vous connectant, vous acceptez nos conditions."
              : "En vous inscrivant, vous rejoignez l'élite."}
          </p>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default AuthForm;
