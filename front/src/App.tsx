import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  LayoutDashboard, 
  Bell, 
  Briefcase,
  Layers,
  Zap,
  MousePointer2
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Dialog, DialogTrigger } from "./components/ui/dialog";
import AuthForm from "./components/authForm";
import { useEffect, useState } from "react";
import { isLoggedIn } from "./api/services/user";

// Internal Preview Component for visual impact
const DashboardPreview = () => (
  <div className="relative mt-20 md:mt-28 w-full max-w-5xl mx-auto perspective-1000 animate-in fade-in zoom-in duration-1000 delay-300 fill-mode-both">
    <div className="group relative bg-card border border-border/60 rounded-[2.5rem] shadow-[0_0_80px_-20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden transform rotate-x-6 rotate-y-[-4deg] skew-x-1 hover:rotate-x-0 hover:rotate-y-0 hover:skew-x-0 transition-all duration-1000 ease-out cursor-default">
      {/* Fake Header */}
      <div className="h-14 border-b border-border/40 bg-muted/30 backdrop-blur-md flex items-center px-8 gap-x-2">
        <div className="flex gap-2">
          <div className="size-3.5 rounded-full bg-rose-500/30" />
          <div className="size-3.5 rounded-full bg-amber-500/30" />
          <div className="size-3.5 rounded-full bg-emerald-500/30" />
        </div>
        <div className="h-4 w-40 bg-muted/60 rounded-full ml-8 opacity-50" />
      </div>
      
      {/* Fake Content */}
      <div className="p-10 md:p-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Fake Sidebar */}
        <div className="hidden md:flex flex-col gap-y-6 opacity-30">
          <div className="h-11 w-full bg-primary/20 rounded-2xl" />
          <div className="h-11 w-full bg-muted/60 rounded-2xl" />
          <div className="h-11 w-full bg-muted/60 rounded-2xl" />
          <div className="mt-auto h-11 w-full bg-muted/30 rounded-2xl" />
        </div>
        
        {/* Fake Main Area */}
        <div className="md:col-span-3 flex flex-col gap-y-10">
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-card border border-border/40 rounded-3xl p-5 flex flex-col justify-between shadow-sm group-hover:translate-y-[-6px] transition-transform duration-500" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className={`size-10 rounded-xl ${i === 1 ? 'bg-amber-500/20' : i === 2 ? 'bg-blue-500/20' : 'bg-primary/20'}`} />
                <div className="h-5 w-20 bg-muted/60 rounded-full" />
              </div>
            ))}
          </div>
          
          <div className="space-y-5">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 w-full bg-card border border-border/40 rounded-3xl p-6 flex items-center gap-x-6 shadow-sm">
                <div className="size-12 bg-muted/60 rounded-2xl" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-1/3 bg-muted/60 rounded-full" />
                  <div className="h-4 w-1/4 bg-muted/30 rounded-full" />
                </div>
                <div className={`h-8 w-28 rounded-full border border-border/40 ${i === 1 ? 'bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-[10px] font-black' : 'bg-muted/40'}`}>
                  {i === 1 && "ACCEPTÉ"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* High-end Reflection Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
    </div>
    
    {/* Floating elements */}
    <div className="absolute -top-12 -right-12 md:-top-20 md:-right-20 p-6 bg-background/80 border border-border/60 shadow-2xl rounded-[2rem] hidden sm:flex items-center gap-x-5 animate-bounce-slow backdrop-blur-xl ring-1 ring-white/20">
      <div className="size-14 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/40">
        <CheckCircle2 className="size-8 text-white" />
      </div>
      <div className="pr-6">
        <p className="text-base font-black tracking-tight leading-none mb-1">C'est signé !</p>
        <p className="text-xs text-muted-foreground font-bold opacity-60 uppercase tracking-widest">Contrat validé</p>
      </div>
    </div>
  </div>
);

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    isLoggedIn().then((res) => {
      if (res && res.user) {
        window.location.href = "/dashboard";
      }
    });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
      
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-background min-h-screen w-full flex flex-col relative overflow-x-hidden selection:bg-primary/30 selection:text-primary scroll-smooth font-sans">
      {/* High-end Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-primary z-[60] transition-all duration-300" style={{ width: `${scrollProgress}%` }} />

      {/* Interactive Cursor Glow */}
      <div 
        className="fixed pointer-events-none z-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] opacity-0 animate-in fade-in duration-1000"
        style={{ 
          left: mousePos.x - 400, 
          top: mousePos.y - 400,
          transition: 'left 0.4s cubic-bezier(0.16, 1, 0.3, 1), top 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      />
      
      {/* Background Decor */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.08] dark:opacity-[0.04] pointer-events-none z-0" />
      
      {/* Dynamic Floating Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 transition-all duration-500 pointer-events-none">
        <nav className={`
          flex items-center justify-between px-8 transition-all duration-500 pointer-events-auto
          ${scrolled 
            ? "h-16 w-[90%] md:w-[60%] rounded-full bg-background/70 backdrop-blur-2xl border border-border/40 shadow-2xl shadow-black/5" 
            : "h-20 w-[100%] rounded-none bg-transparent border-transparent"
          }
        `}>
          <div className="flex items-center gap-x-3 group cursor-pointer">
            <div className={`
              bg-primary rounded-xl flex items-center justify-center shadow-xl shadow-primary/25 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500
              ${scrolled ? "size-9" : "size-11"}
            `}>
              <Briefcase className={`${scrolled ? "size-5" : "size-6"} text-white`} />
            </div>
            <div className="flex flex-col">
              <span className={`${scrolled ? "text-xl" : "text-2xl"} font-black tracking-tighter leading-none transition-all`}>JobLog</span>
              {!scrolled && <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mt-0.5">Career Manager</span>}
            </div>
          </div>
          
          <div className="flex items-center gap-x-3 sm:gap-x-6">
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-[10px] sm:text-xs font-black uppercase tracking-widest hover:text-primary transition-colors cursor-pointer block">Login</button>
              </DialogTrigger>
              <AuthForm title="Bon retour !" description="Accédez à votre espace" submitText="Login" isLogin={true} />
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className={`
                  rounded-full font-black shadow-xl shadow-primary/15 hover:shadow-primary/25 hover:scale-105 transition-all active:scale-95 transition-all
                  ${scrolled ? "h-8 sm:h-9 px-4 sm:px-6 text-[9px] sm:text-[10px] uppercase tracking-widest" : "h-10 sm:h-12 px-5 sm:px-8 text-xs sm:text-sm"}
                `}>S'inscrire</Button>
              </DialogTrigger>
              <AuthForm title="Bienvenue" description="Rejoignez-nous" submitText="S'inscrire" isLogin={false} />
            </Dialog>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center pt-32 md:pt-48 pb-32 px-8 relative z-10">
        <div className="max-w-5xl w-full text-center space-y-12">
          
          {/* Glass Pill Hero Badge */}
          <div className="inline-flex items-center gap-x-3 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-primary text-[10px] font-black uppercase tracking-[0.3em] animate-in slide-in-from-top-4 duration-1000 shadow-2xl ring-1 ring-primary/20">
            <Sparkles className="size-3.5 animate-pulse text-primary" />
            <span>Nouvelle ère — Version 2.0</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[11rem] font-black tracking-tighter leading-[0.8] animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            Organisez <br />
            <span className="bg-gradient-to-r from-primary via-blue-400 to-indigo-500 bg-[length:200%_auto] animate-gradient text-transparent bg-clip-text drop-shadow-2xl">
              votre futur.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-bold animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 fill-mode-both opacity-70 italic tracking-tight">
            La plateforme chirurgicale pour dominer votre recherche d'emploi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400 fill-mode-both">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="h-16 px-14 rounded-full text-xl font-black shadow-[0_20px_40px_-10px_rgba(59,130,246,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.5)] transition-all hover:-translate-y-1.5 gap-x-3 group">
                  Get Started
                  <ArrowRight className="size-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </DialogTrigger>
              <AuthForm title="Bienvenue" description="Rejoignez-nous" submitText="S'inscrire" isLogin={false} />
            </Dialog>
            
            <button 
              onClick={() => window.location.href = "/demo"}
              className="h-16 px-10 rounded-full text-lg font-black border border-border/60 hover:bg-muted/30 transition-all flex items-center gap-x-2 group cursor-pointer"
            >
              <MousePointer2 className="size-5 group-hover:rotate-12 transition-transform" />
              Demo
            </button>
          </div>

          {/* Minimal Feature highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-28 border-t border-border/30 max-w-4xl mx-auto animate-in fade-in duration-1000 delay-500">
            {[
              { icon: Search, label: "Filtrage" },
              { icon: LayoutDashboard, label: "Dashboard" },
              { icon: Bell, label: "Alertes" },
              { icon: Zap, label: "Stats" }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center gap-y-3 group cursor-default">
                <div className="size-16 rounded-3xl bg-muted/30 flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all duration-700 shadow-sm border border-border/20">
                  <feature.icon className="size-7 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 group-hover:opacity-100 transition-opacity">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        <DashboardPreview />
      </main>

      {/* Trust Section */}
      <section className="py-32 border-t border-border/40 bg-muted/5 relative overflow-hidden">
        <div className="absolute -bottom-24 -left-24 size-96 bg-primary/5 blur-[120px] rounded-full opacity-30" />
        <div className="max-w-6xl mx-auto px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-28 tracking-tighter">Votre succès est ici.</h2>
          <div className="grid md:grid-cols-3 gap-20">
            {[
              { icon: Layers, title: "Maîtrise", desc: "Contrôlez chaque détail sans effort." },
              { icon: Search, title: "Precision", desc: "Suivez votre parcours en temps réel." },
              { icon: Zap, title: "Impact", desc: "Accélérez votre carrière dès aujourd'hui." }
            ].map((item, i) => (
              <div key={i} className="group p-10 rounded-[3rem] bg-background border border-border/30 hover:border-primary/40 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 hover:-translate-y-3">
                <div className="size-20 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-10 group-hover:scale-110 transition-transform shadow-inner ring-1 ring-primary/10">
                  <item.icon className="text-primary size-9" />
                </div>
                <h3 className="text-3xl font-black mb-5 tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground font-bold leading-relaxed opacity-70">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-12 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-y-8 text-sm font-bold text-muted-foreground bg-card/10 backdrop-blur-sm">
        <div className="flex items-center gap-x-5">
          <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
            <Briefcase className="size-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-foreground text-lg tracking-tight leading-none">JobLog</span>
            <span className="text-[10px] opacity-40 font-black uppercase tracking-widest mt-1">© 2026 Career Manager</span>
          </div>
        </div>
        <div className="flex items-center gap-x-16">
          <a href="#" className="hover:text-primary transition-colors uppercase tracking-widest text-[10px]">Confidentialité</a>
          <a href="#" className="hover:text-primary transition-colors uppercase tracking-widest text-[10px]">Conditions</a>
          <a href="#" className="hover:text-primary transition-colors uppercase tracking-widest text-[10px]">Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
