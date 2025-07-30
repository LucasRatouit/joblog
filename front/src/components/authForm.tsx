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

const AuthForm = (props: { title: string; description: string }) => {
  return (
    <DialogContent className="bg-card">
      <DialogHeader>
        <DialogTitle className="text-2xl">{props.title}</DialogTitle>
        <DialogDescription>{props.description}</DialogDescription>
      </DialogHeader>
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="votre@email.com" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Mot de passe</Label>
          <Input type="password" id="password" placeholder="••••••••" />
        </div>
      </div>
      <DialogFooter>
        <Button className="w-full cursor-pointer">Créer mon compte</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AuthForm;
