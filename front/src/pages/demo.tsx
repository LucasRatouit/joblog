import {
  BadgeCheck,
  Clock,
  List,
  TriangleAlert,
  Users,
  Building2,
  MapPin,
  Plus,
  CheckCircle2,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import AppSidebar from "../components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
import { cn } from "../lib/utils";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { statusGradientColor, statusEnumToString } from "../api/config";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { useDemoStore, type DemoJob } from "../stores/demo";
import { useState } from "react";

// --- Internal Components ---

const DemoInfoCard = ({
  name,
  number,
  logo,
  color = "default",
  className,
}: {
  name: string;
  number: number;
  logo: ReactNode;
  color?: string;
  className?: string;
}) => (
  <div
    className={cn(
      "group relative bg-card border border-border/40 rounded-3xl p-4 sm:p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-primary/5",
      className,
    )}
  >
    <div
      className={cn(
        "absolute top-4 sm:top-6 left-0 w-1.5 h-8 sm:h-10 rounded-r-full bg-gradient-to-b transition-all duration-500 group-hover:h-12 sm:group-hover:h-14",
        statusGradientColor(color),
      )}
    />
    <div className="flex justify-between items-start pl-1 sm:pl-2">
      <div className="space-y-0.5 sm:space-y-1">
        <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-foreground/40 dark:text-muted-foreground/60">
          {name}
        </p>
        <h3 className="text-2xl sm:text-4xl font-black tracking-tighter tabular-nums">
          {number}
        </h3>
      </div>
      <div
        className={cn(
          "size-10 sm:size-12 shrink-0 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 bg-gradient-to-br",
          statusGradientColor(color),
        )}
      >
        <div className="scale-90 sm:scale-100">{logo}</div>
      </div>
    </div>
    <div className="absolute bottom-0 right-0 size-16 sm:size-24 bg-gradient-to-br from-transparent to-muted/20 rounded-tl-[3rem] sm:rounded-tl-[4rem] -z-10 opacity-50 group-hover:scale-110 transition-transform duration-700" />
  </div>
);

const DemoInfoCardList = ({ jobs }: { jobs: DemoJob[] }) => {
  const stats = [
    {
      name: "Total",
      number: jobs.length,
      logo: <List className="size-5 sm:size-6" />,
      color: "default",
    },
    {
      name: "En attente",
      number: jobs.filter((j) => j.status === "PENDING").length,
      logo: <Clock className="size-5 sm:size-6" />,
      color: "PENDING",
    },
    {
      name: "Entretiens",
      number: jobs.filter((j) => j.status === "INTERVIEW").length,
      logo: <Users className="size-5 sm:size-6" />,
      color: "INTERVIEW",
    },
    {
      name: "À rappeler",
      number: jobs.filter((j) => j.status === "FOLLOW_UP").length,
      logo: <TriangleAlert className="size-5 sm:size-6" />,
      color: "FOLLOW_UP",
    },
    {
      name: "Acceptées",
      number: jobs.filter((j) => j.status === "ACCEPTED").length,
      logo: <BadgeCheck className="size-5 sm:size-6" />,
      color: "ACCEPTED",
    },
  ];

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 animate-in fade-in slide-in-from-top-4 duration-1000">
      {stats.map((stat) => (
        <DemoInfoCard key={stat.name} {...stat} />
      ))}
    </div>
  );
};

const DemoJobsList = ({
  jobs,
  onDelete,
}: {
  jobs: DemoJob[];
  onDelete: (id: string) => void;
}) => (
  <div className="grid gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
    {jobs.map((job) => (
      <Card
        key={job.id}
        className="group relative overflow-hidden border-border/40 bg-card hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-primary/5 rounded-3xl p-0"
      >
        <div
          className={cn(
            "absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b opacity-70 group-hover:w-2 transition-all duration-500",
            statusGradientColor(job.status),
          )}
        />
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-black tracking-tighter leading-none group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              <Badge
                className={cn(
                  "rounded-full font-black text-[10px] uppercase tracking-widest px-3 py-1 border-0 text-white shadow-sm",
                  statusGradientColor(job.status),
                )}
              >
                {statusEnumToString(job.status)}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <div className="flex items-center gap-x-2 text-foreground/60 font-bold text-sm">
                <div className="size-8 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                  <Building2 className="size-4 text-foreground/80" />
                </div>
                {job.company}
              </div>
              <div className="flex items-center gap-x-2 text-foreground/60 font-bold text-sm">
                <div className="size-8 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                  <MapPin className="size-4 text-foreground/80" />
                </div>
                {job.location}
              </div>
            </div>
            {job.comment && (
              <div className="relative group/comment">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-muted rounded-full" />
                <p className="text-sm font-medium text-muted-foreground italic pl-4 py-1 leading-relaxed">
                  "{job.comment}"
                </p>
              </div>
            )}
          </div>
          <div className="md:border-l border-border/30 md:pl-6 w-full md:w-auto flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(job.id)}
              className="size-10 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all opacity-0 group-hover:opacity-100"
            >
              <X className="size-5" />
            </Button>
          </div>
        </div>
      </Card>
    ))}
  </div>
);

/**
 * Demo page component.
 * Displays fake data for demonstration purposes.
 *
 * @returns {JSX.Element} The rendered demo page
 */
const DemoPage = (): JSX.Element => {
  const { jobs, addJob, deleteJob } = useDemoStore();
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      company: "",
      location: "",
      status: "PENDING",
      comment: "",
    },
  });

  const onSubmit = (data: any) => {
    addJob(data);
    setIsOpen(false);
    reset();
    toast.success("Candidature ajoutée (Mode Démo) !");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background transition-colors duration-300">
        <AppSidebar />
        <SidebarInset className="flex flex-col bg-background">
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 sticky top-0 z-30 bg-background/50 backdrop-blur-xl border-b border-border/5 transition-all">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="size-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-all border border-border/40 shadow-sm" />
              <div className="h-4 w-px bg-border/40 mx-2" />
              <h2 className="text-sm font-black uppercase tracking-widest opacity-40">
                Mode Démo
              </h2>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <Badge
                variant="outline"
                className="text-[10px] font-black uppercase tracking-widest text-primary border-primary/20 bg-primary/5"
              >
                Environnement de démonstration
              </Badge>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-4 md:pt-4">
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <DemoInfoCardList jobs={jobs} />

              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-black tracking-tighter">
                      Candidatures de Démo
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium">
                      Ceci est un aperçu de l'interface avec de fausses
                      informations.
                    </p>
                  </div>

                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button className="h-12 px-8 rounded-2xl font-black uppercase tracking-widest text-xs gap-x-2 shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-1">
                        <Plus className="size-4" />
                        Ajouter un Job
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] bg-card border-border/40 shadow-2xl rounded-[2.5rem] p-0 overflow-hidden backdrop-blur-xl">
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col h-full"
                      >
                        <DialogHeader className="p-8 pb-4 bg-muted/20">
                          <DialogTitle className="text-3xl font-black tracking-tighter">
                            Nouvelle Opportunité
                          </DialogTitle>
                          <DialogDescription className="font-bold text-xs uppercase tracking-widest opacity-60">
                            Ajoutez une fausse candidature pour tester la démo
                          </DialogDescription>
                        </DialogHeader>

                        <div className="p-8 py-6 space-y-5">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 pl-1">
                              Poste
                            </Label>
                            <Input
                              {...register("title", { required: true })}
                              placeholder="ex: Développeur Senior"
                              className="h-12 bg-muted/30 border-border/40 rounded-xl focus:ring-primary/20 transition-all font-bold"
                            />
                            {errors.title && (
                              <span className="text-[10px] text-destructive font-bold uppercase ml-1">
                                Requis
                              </span>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 pl-1">
                              Entreprise
                            </Label>
                            <Input
                              {...register("company", { required: true })}
                              placeholder="ex: Google"
                              className="h-12 bg-muted/30 border-border/40 rounded-xl focus:ring-primary/20 transition-all font-bold"
                            />
                            {errors.company && (
                              <span className="text-[10px] text-destructive font-bold uppercase ml-1">
                                Requis
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 pl-1">
                                Lieu
                              </Label>
                              <Input
                                {...register("location")}
                                placeholder="ex: Paris"
                                className="h-12 bg-muted/30 border-border/40 rounded-xl focus:ring-primary/20 transition-all font-bold"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 pl-1">
                                Statut
                              </Label>
                              <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <SelectTrigger className="h-12 bg-muted/30 border-border/40 rounded-xl focus:ring-primary/20 transition-all font-bold">
                                      <SelectValue placeholder="Sélectionner" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-border/40 backdrop-blur-xl">
                                      <SelectItem
                                        value="PENDING"
                                        className="font-bold"
                                      >
                                        En attente
                                      </SelectItem>
                                      <SelectItem
                                        value="INTERVIEW"
                                        className="font-bold"
                                      >
                                        Entretien
                                      </SelectItem>
                                      <SelectItem
                                        value="FOLLOW_UP"
                                        className="font-bold"
                                      >
                                        À rappeler
                                      </SelectItem>
                                      <SelectItem
                                        value="ACCEPTED"
                                        className="font-bold"
                                      >
                                        Accepté
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>
                          </div>
                        </div>

                        <DialogFooter className="p-8 pt-4 bg-muted/10 border-t border-border/20">
                          <Button
                            type="submit"
                            className="w-full h-12 rounded-2xl font-black uppercase tracking-widest text-xs gap-x-2 shadow-xl shadow-primary/20 transition-all"
                          >
                            Ajouter à la démo
                            <CheckCircle2 className="size-4" />
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                <DemoJobsList jobs={jobs} onDelete={deleteJob} />
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DemoPage;
