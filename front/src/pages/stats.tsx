import { useEffect, useMemo } from "react";
import AppSidebar from "../components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
import { useJobStore } from "../stores/job";
import InfoCardList from "../components/infoCard";
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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart";
import { statusEnumToString } from "../api/config";

const Stats = () => {
  const { jobs, getJobs } = useJobStore();

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  const statusData = useMemo(() => {
    const counts = jobs.reduce((acc: any, job) => {
      const status = job.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return [
      {
        status: "PENDING",
        count: counts["PENDING"] || 0,
        fill: "var(--color-pending)",
      },
      {
        status: "INTERVIEW",
        count: counts["INTERVIEW"] || 0,
        fill: "var(--color-interview)",
      },
      {
        status: "FOLLOW_UP",
        count: counts["FOLLOW_UP"] || 0,
        fill: "var(--color-follow_up)",
      },
      {
        status: "ACCEPTED",
        count: counts["ACCEPTED"] || 0,
        fill: "var(--color-accepted)",
      },
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

  const chartConfig = {
    count: {
      label: "Nombre",
    },
    pending: {
      label: "En attente",
      color: "hsl(var(--warning))",
    },
    interview: {
      label: "Entretien",
      color: "hsl(var(--primary))",
    },
    follow_up: {
      label: "À rappeler",
      color: "hsl(var(--accent))",
    },
    accepted: {
      label: "Accepté",
      color: "hsl(var(--success))",
    },
  };

  // Status colors matching our theme/api config
  const COLORS = {
    PENDING: "#fb923c", // orange-400
    INTERVIEW: "#60a5fa", // blue-400
    FOLLOW_UP: "#c084fc", // purple-400
    ACCEPTED: "#4ade80", // green-400
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
                Statistiques
              </h2>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div>
                <h1 className="text-3xl font-black tracking-tighter">
                  Analyses
                </h1>
                <p className="text-muted-foreground text-sm font-medium">
                  Visualisez l'état de vos recherches et vos performances.
                </p>
              </div>

              <InfoCardList />

              <div className="grid gap-6 md:grid-cols-2">
                {/* Status Distribution (Pie Chart) */}
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

                {/* Top Companies (Bar Chart) */}
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

export default Stats;
