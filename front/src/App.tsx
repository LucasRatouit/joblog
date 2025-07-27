import { Link } from "react-router";

function App() {
  return (
    <div
      className="h-screen pt-52 flex flex-col items-center text-center
                    bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
                    "
    >
      <div className="max-w-[800px]">
        <h1
          className="flex flex-col items-center
      text-joblog-400 text-7xl font-bold mb-10"
        >
          Gérez vos candidatures{" "}
          <span className="text-joblog-600">intelligemment</span>
        </h1>
        <p className="mb-10 text-xl font-sans">
          JobLog vous aide à organiser, suivre et optimiser vos recherches
          d'emploi. Gardez une trace de toutes vos candidatures en un seul
          endroit.
        </p>
        <div className="mt-2 font-medium flex justify-center space-x-6">
          <Link
            to="/auth/login"
            className="text-blue-500 underline underline-offset-4"
          >
            Déjà un compte ? Se connecter
          </Link>
          <span className="text-gray-500">|</span>
          <Link
            to="/auth/register"
            className="text-blue-500 underline underline-offset-4"
          >
            Nouveau ? Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
