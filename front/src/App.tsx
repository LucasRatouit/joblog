import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./components/ui/button";
import { Dialog, DialogTrigger } from "./components/ui/dialog";
import AuthForm from "./components/authForm";
import { useEffect } from "react";
import { isLoggedIn } from "./api/services/user";

function App() {
  useEffect(() => {
    isLoggedIn().then(() => {
      window.location.href = "/dashboard";
    });
  }, []);

  return (
    <div className="bg-background h-screen w-full flex flex-col justify-center items-center text-center">
      <div className="z-10 max-w-4xl flex flex-col mx-3 space-y-6 md:space-y-8 relative">
        {/* BLUR START */}
        <div
          className="-z-10 w-[200px] h-[200px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] bg-primary/40 blur-3xl rounded-full absolute top-0 left-10 md:-top-15 md:-left-0 lg:-top-30 lg:-left-30"
          style={{
            animation: "blurAnimation1 30s ease-in-out infinite",
          }}
        />
        <div
          className="-z-10 w-[100px] h-[100px] md:w-[300px] md:h-[300px] lg:w-[500px] lg:h-[500px] bg-primary/30 blur-2xl rounded-full absolute -bottom-32 right-0"
          style={{
            animation: "blurAnimation2 10s ease-in-out infinite",
          }}
        />
        {/* BLUR END */}
        <div className="w-min mx-auto px-4 py-2 text-nowrap text-sm relative">
          <div className="h-full w-full bg-primary/20 rounded-full absolute top-0 right-0" />
          <div className="h-full w-full border border-primary/40 rounded-full absolute top-0 left-0" />
          <p className="text-primary flex gap-x-2 items-center font-medium relative">
            <Sparkles className="size-4" />
            Première version récente
          </p>
        </div>
        <h1 className="text-secondary-foreground text-5xl sm:text-6xl lg:text-7xl font-bold">
          Simplifiez votre processus de recherche de travail avec{" "}
          <span className="text-primary">JobLog</span>
        </h1>
        <p className="text-gray-400 text-2xl font-light">
          JobLog vous aide à organiser, suivre et optimiser vos recherches
          d'emploi. Gardez une trace de toutes vos candidatures en un seul
          endroit.
        </p>
        <div className="w-full  flex flex-col gap-y-2 md:flex-row justify-center space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full md:w-min text-lg px-20 py-6 cursor-pointer">
                Commencer gratuitement <ArrowRight />
              </Button>
            </DialogTrigger>
            <AuthForm
              title="Créer un compte"
              description="Commencez votre parcours avec JobLog"
              submitText="Créer mon compte"
              isLogin={false}
            />
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="text-secondary-foreground text-lg py-6 cursor-pointer"
              >
                Se connecter
              </Button>
            </DialogTrigger>
            <AuthForm
              title="Se connecter"
              description="Accédez à votre dashboard JobLog"
              submitText="Me connecter"
              isLogin={true}
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default App;
