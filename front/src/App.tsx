import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  LayoutDashboard, 
  Bell, 
  Briefcase,
  Layers,
  Zap
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Dialog, DialogTrigger } from "./components/ui/dialog";
import AuthForm from "./components/authForm";
import { useEffect } from "react";
import { isLoggedIn } from "./api/services/user";

// Internal Preview Component for visual impact
const DashboardPreview = () => (
  <div className="relative mt-16 md:mt-24 w-full max-w-5xl mx-auto perspective-1000">
    <div className="relative bg-card border border-border rounded-2xl shadow-2xl overflow-hidden transform rotate-x-6 rotate-y-[-4deg] skew-x-1 hover:rotate-x-0 hover:rotate-y-0 hover:skew-x-0 transition-all duration-700 ease-out">
      {/* Fake Header */}
      <div className="h-12 border-b border-border bg-muted/30 flex items-center px-4 gap-x-2">
        <div className="size-3 rounded-full bg-rose-500/50" />
        <div className="size-3 rounded-full bg-amber-500/50" />
        <div className="size-3 rounded-full bg-emerald-500/50" />
        <div className="h-6 w-48 bg-muted rounded-md ml-4" />
      </div>
      
      {/* Fake Content */}
      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fake Sidebar */}
        <div className="hidden md:flex flex-col gap-y-4">
          <div className="h-10 w-full bg-primary/10 rounded-lg" />
          <div className="h-10 w-full bg-muted/50 rounded-lg" />
          <div className="h-10 w-full bg-muted/50 rounded-lg" />
          <div className="mt-auto h-10 w-full bg-muted/20 rounded-lg" />
        </div>
        
        {/* Fake Main Area */}
        <div className="md:col-span-2 flex flex-col gap-y-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="h-24 bg-card border border-border rounded-xl p-3 flex flex-col justify-between">
              <div className="size-6 bg-amber-500/20 rounded-md" />
              <div className="h-4 w-12 bg-muted rounded" />
            </div>
            <div className="h-24 bg-card border border-border rounded-xl p-3 flex flex-col justify-between">
              <div className="size-6 bg-blue-500/20 rounded-md" />
              <div className="h-4 w-12 bg-muted rounded" />
            </div>
            <div className="h-24 bg-primary/5 border border-primary/20 rounded-xl p-3 flex flex-col justify-between">
              <div className="size-6 bg-primary/20 rounded-md" />
              <div className="h-4 w-12 bg-primary/30 rounded" />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="h-16 w-full bg-card border border-border rounded-xl p-4 flex items-center gap-x-4">
              <div className="size-8 bg-muted rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 bg-muted rounded" />
                <div className="h-3 w-1/4 bg-muted/50 rounded" />
              </div>
              <div className="h-6 w-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full" />
            </div>
            <div className="h-16 w-full bg-card border border-border rounded-xl p-4 flex items-center gap-x-4 opacity-60">
              <div className="size-8 bg-muted rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/4 bg-muted rounded" />
                <div className="h-3 w-1/5 bg-muted/50 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Blur Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
    </div>
    
    {/* Floating elements */}
    <div className="absolute -top-6 -right-6 md:-top-12 md:-right-12 p-4 bg-background border border-border rounded-2xl shadow-xl hidden sm:flex items-center gap-x-3 animate-bounce-slow">
      <div className="size-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
        <CheckCircle2 className="size-6 text-emerald-500" />
      </div>
      <div>
        <p className="text-sm font-bold">Candidature acceptée !</p>
        <p className="text-xs text-muted-foreground">Chez TechFlow Studio</p>
      </div>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    isLoggedIn().then(() => {
      window.location.href = "/dashboard";
    });
  }, []);

  return (
    <div className="bg-background min-h-screen w-full flex flex-col relative overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.1] dark:opacity-[0.05] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-primary/10 blur-[120px] rounded-full opacity-50 -z-10" />
      
      {/* Navbar */}
      <nav className="w-full h-20 border-b border-border/50 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-x-2 group cursor-default">
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-300">
            <Briefcase className="text-white size-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">JobLog</span>
        </div>
        
        <div className="flex items-center gap-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="hidden sm:flex font-medium">Se connecter</Button>
            </DialogTrigger>
            <AuthForm
              title="Se connecter"
              description="Accédez à votre dashboard JobLog"
              submitText="Me connecter"
              isLogin={true}
            />
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-full px-6 shadow-sm hover:shadow-md transition-all">S'inscrire</Button>
            </DialogTrigger>
            <AuthForm
              title="Créer un compte"
              description="Commencez votre parcours avec JobLog"
              submitText="Créer mon compte"
              isLogin={false}
            />
          </Dialog>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center pt-20 md:pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-4xl w-full text-center space-y-10">
          
          <div className="inline-flex items-center gap-x-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold animate-fade-in">
            <Sparkles className="size-4" />
            <span>Nouvelle ère du suivi de carrière</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] md:leading-[0.9]">
            Organisez votre futur <br />
            <span className="bg-gradient-to-r from-primary via-blue-500 to-primary bg-[length:200%_auto] animate-gradient text-transparent bg-clip-text">
              sans effort.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ne perdez plus jamais le fil de vos candidatures. Centralisez, analysez et 
            optimisez chaque étape de votre recherche d'emploi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="h-14 px-8 rounded-full text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all gap-x-2 group">
                  Démarrer maintenant 
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </DialogTrigger>
              <AuthForm
                title="Créer un compte"
                description="Commencez votre parcours avec JobLog"
                submitText="Créer mon compte"
                isLogin={false}
              />
            </Dialog>
            
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg font-semibold bg-background/50 backdrop-blur-sm border-border hover:bg-muted/50 transition-colors">
              Voir la démo
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 border-t border-border/50 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-y-2">
              <div className="size-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                <Search className="size-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest opacity-60">Filtrage Intelligent</span>
            </div>
            <div className="flex flex-col items-center gap-y-2">
              <div className="size-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                <LayoutDashboard className="size-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest opacity-60">Vue Kanban</span>
            </div>
            <div className="flex flex-col items-center gap-y-2">
              <div className="size-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                <Bell className="size-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest opacity-60">Rappels Automatiques</span>
            </div>
            <div className="flex flex-col items-center gap-y-2">
              <div className="size-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                <Zap className="size-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest opacity-60">Stats Rapides</span>
            </div>
          </div>
        </div>

        <DashboardPreview />
      </main>

      {/* Trust Section */}
      <section className="py-24 border-t border-border bg-muted/20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 tracking-tight">Pourquoi choisir JobLog ?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Layers className="text-primary size-6" />
              </div>
              <h3 className="text-xl font-bold">Organisation Totale</h3>
              <p className="text-muted-foreground">
                Gérez des centaines de candidatures sans effort grâce à notre interface intuitive.
              </p>
            </div>
            <div className="space-y-4">
              <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="text-primary size-6" />
              </div>
              <h3 className="text-xl font-bold">Suivi Précis</h3>
              <p className="text-muted-foreground">
                Sachez exactement où vous en êtes pour chaque opportunité, du premier contact à l'offre.
              </p>
            </div>
            <div className="space-y-4">
              <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="text-primary size-6" />
              </div>
              <h3 className="text-xl font-bold">Optimisation</h3>
              <p className="text-muted-foreground">
                Identifiez ce qui fonctionne et améliorez votre taux de réponse grâce aux statistiques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-y-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-x-2">
          <Briefcase className="size-4" />
          <span className="font-bold text-foreground">JobLog</span>
          <span>© 2026 — Tous droits réservés.</span>
        </div>
        <div className="flex items-center gap-x-8">
          <a href="#" className="hover:text-primary transition-colors">Politique de confidentialité</a>
          <a href="#" className="hover:text-primary transition-colors">Conditions d'utilisation</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
