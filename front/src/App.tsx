import { ArrowRight, CheckCircleIcon, Sparkles } from "lucide-react";
import { Button } from "./components/ui/button";
import { Dialog, DialogTrigger } from "./components/ui/dialog";
import AuthForm from "./components/authForm";

function App() {
  return (
    <div
      className="h-screen flex flex-col justify-center items-center text-center
                    bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
                    "
    >
      <div className="max-w-[800px] space-y-8">
        <div
          className="w-min mx-auto px-4 py-2 text-nowrap text-sm
                      border border-joblog-800 rounded-full relative"
        >
          <div className="h-full w-full bg-joblog-700 opacity-15 rounded-full absolute top-0 right-0" />
          <p className="text-joblog-300 flex gap-x-2 items-center font-medium relative">
            <Sparkles className="size-4 text-joblog-500" />
            Nouvelle version disponible
          </p>
        </div>
        <h1
          className="flex flex-col items-center
      text-joblog-400 text-7xl font-bold"
        >
          Gérez vos candidatures{" "}
          <span className="text-joblog-600">intelligemment</span>
        </h1>
        <p className="text-xl font-sans">
          JobLog vous aide à organiser, suivre et optimiser vos recherches
          d'emploi. Gardez une trace de toutes vos candidatures en un seul
          endroit.
        </p>
        <div className="flex justify-center space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-lg w-80 py-7 cursor-pointer">
                Commencer gratuitement <ArrowRight />
              </Button>
            </DialogTrigger>
            <AuthForm
              title="Créer un compte"
              description="Commencez votre parcours avec JobLog"
            />
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="text-lg w-80 py-7 cursor-pointer"
              >
                Se connecter
              </Button>
            </DialogTrigger>
            <AuthForm
              title="Se connecter"
              description="Accédez à votre dashboard JobLog"
            />
          </Dialog>
        </div>
        <div className="text-gray-400 flex justify-center gap-x-10">
          <span className="flex items-center gap-x-2">
            <CheckCircleIcon className="text-green-500 size-4" /> Gratuit pour
            toujours
          </span>
          <span className="flex items-center gap-x-2">
            <CheckCircleIcon className="text-green-500 size-4" />
            Aucune carte requise
          </span>
          <span className="flex items-center gap-x-2">
            <CheckCircleIcon className="text-green-500 size-4" />
            Configuration facile
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
