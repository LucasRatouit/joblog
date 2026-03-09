import { useMemo } from "react";
import AppSidebar from "../components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
import { useDemoStore, type DemoJob } from "../stores/demo";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { statusEnumToString, statusGradientColor } from "../api/config";
import { BadgeCheck, Clock, List, TriangleAlert, Users } from "lucide-react";
import { cn } from "../lib/utils";
import type { ReactNode } from "react";
import { Badge } from "../components/ui/badge";

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
      className
    )}
  >
    <div
      className={cn(
        "absolute top-4 sm:top-6 left-0 w-1.5 h-8 sm:h-10 rounded-r-full bg-gradient-to-b transition-all duration-500 group-hover:h-12 sm:group-hover:h-14",
        statusGradientColor(color)
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
          statusGradientColor(color)
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
    { name: "Total", number: jobs.length, logo: <List className="size-5 sm:size-6" />, color: "default" },
    { name: "En attente", number: jobs.filter(j => j.status === "PENDING").length, logo: <Clock className="size-5 sm:size-6" />, color: "PENDING" },
    { name: "Entretiens", number: jobs.filter(j => j.status === "INTERVIEW").length, logo: <Users className="size-5 sm:size-6" />, color: "INTERVIEW" },
    { name: "À rappeler", number: jobs.filter(j => j.status === "FOLLOW_UP").length, logo: <TriangleAlert className="size-5 sm:size-6" />, color: "FOLLOW_UP" },
    { name: "Acceptées", number: jobs.filter(j => j.status === "ACCEPTED").length, logo: <BadgeCheck className="size-5 sm:size-6" />, color: "ACCEPTED" },
  ];

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 animate-in fade-in slide-in-from-top-4 duration-1000">
      {stats.map((stat) => (
        <DemoInfoCard key={stat.name} {...stat} />
      ))}
    </div>
  );
};

const DemoStats = () => {
  const { jobs } = useDemoStore();

  const statusData = useMemo(() => {
    const counts = jobs.reduce((acc: any, job) => {
      const status = job.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return [
      { status: "PENDING", count: counts["PENDING"] || 0 },
      { status: "INTERVIEW", count: counts["INTERVIEW"] || 0 },
      { status: "FOLLOW_UP", count: counts["FOLLOW_UP"] || 0 },
      { status: "ACCEPTED", count: counts["ACCEPTED"] || 0 },
    ];
  }, [jobs]);

  const companyData = useMemo(() => {
    const counts = jobs.reduce((acc: any, job) => {
      const company = job.company || "Inconnue";
      acc[company] = (acc[company] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count: count as number }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [jobs]);

  const COLORS = {
    PENDING: "#fb923c",
    INTERVIEW: "#60a5fa",
    FOLLOW_UP: "#c084fc",
    ACCEPTED: "#4ade80",
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
                Statistiques - Démo
              </h2>
            </div>
            <div className="ml-auto">
                <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-primary border-primary/20 bg-primary/5">
                    Mode Démo
                </Badge>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div>
                <h1 className="text-3xl font-black tracking-tighter">
                  Analyses de Démo
                </h1>
                <p className="text-muted-foreground text-sm font-medium">
                  Visualisez l'état de vos recherches fictives.
                </p>
              </div>

              <DemoInfoCardList jobs={jobs} />

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="rounded-[2.5rem] border-border/40 shadow-xl overflow-hidden bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-black tracking-tight">
                      Répartition par statut
                    </CardTitle>
                    <CardDescription className="font-bold text-xs uppercase tracking-widest opacity-60">
                      Visualisation globale de votre pipeline
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="count"
                          nameKey="status"
                        >
                          {statusData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[entry.status as keyof typeof COLORS]}
                            />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-background border border-border/40 p-3 rounded-2xl shadow-2xl">
                                  <p className="font-black text-xs uppercase tracking-widest mb-1">
                                    {statusEnumToString(data.status)}
                                  </p>
                                  <p className="text-sm font-bold text-primary">
                                    {data.count} job(s)
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="rounded-[2.5rem] border-border/40 shadow-xl overflow-hidden bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-black tracking-tight">
                      Top Entreprises
                    </CardTitle>
                    <CardDescription className="font-bold text-xs uppercase tracking-widest opacity-60">
                      Entreprises avec le plus de candidatures
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={companyData}
                        layout="vertical"
                        margin={{ left: 20, right: 20 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          horizontal={false}
                          stroke="rgba(0,0,0,0.05)"
                        />
                        <XAxis type="number" hide />
                        <YAxis
                          dataKey="name"
                          type="category"
                          axisLine={false}
                          tickLine={false}
                          width={100}
                          tick={{
                            fontSize: 10,
                            fontWeight: "bold",
                            fill: "currentColor",
                            opacity: 0.6,
                          }}
                        />
                        <RechartsTooltip
                          cursor={{ fill: "rgba(0,0,0,0.02)" }}
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-background border border-border/40 p-3 rounded-2xl shadow-2xl">
                                  <p className="font-black text-xs uppercase tracking-widest mb-1">
                                    {payload[0].payload.name}
                                  </p>
                                  <p className="text-sm font-bold text-primary">
                                    {payload[0].value} candidature(s)
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar
                          dataKey="count"
                          fill="#3b82f6"
                          radius={[0, 10, 10, 0]}
                          barSize={20}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DemoStats;
