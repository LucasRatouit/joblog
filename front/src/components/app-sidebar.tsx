import {
  LogOut,
  SunMoon,
  LayoutDashboard,
  Briefcase,
  PieChart,
  Settings,
  PlusCircle,
  User,
} from "lucide-react";
import { userLogout } from "../api/services/user";
import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "./ui/sidebar";
import { useTheme } from "./theme-provider";
import { Separator } from "./ui/separator";
import { Link, useLocation } from "react-router";
import { Dialog } from "./ui/dialog";
import JobForm from "./jobForm";
import { useState } from "react";

/**
 * Main sidebar component for the application.
 * Provides navigation, theme switching, and user account actions.
 *
 * @returns {JSX.Element} The rendered sidebar component
 */
const AppSidebar = (): JSX.Element => {
  const { theme, setTheme } = useTheme();
  const { toggleSidebar } = useSidebar();
  const location = useLocation();
  const [jobFormIsOpen, setJobFormIsOpen] = useState<boolean>(false);

  const handleLogout = async (): Promise<void> => {
    try {
      await userLogout();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Briefcase, label: "Candidatures", href: "/applications" },
    { icon: PieChart, label: "Statistiques", href: "/stats" },
  ];

  return (
    <Sidebar variant="floating" className="border-r-0 shadow-2xl">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 px-2">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 rotate-3 transition-transform hover:rotate-0">
              <Briefcase className="size-5 text-white" />
            </div>
            <h1 className="text-xl font-black tracking-tighter">
              Job<span className="text-primary">log</span>
            </h1>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <div className="px-3 mb-4">
            <Dialog open={jobFormIsOpen} onOpenChange={setJobFormIsOpen}>
              <Button 
                className="w-full justify-start gap-x-2 h-11 rounded-xl shadow-lg shadow-primary/15 hover:shadow-primary/25 transition-all"
                onClick={() => setJobFormIsOpen(true)}
              >
                <PlusCircle className="size-4" />
                <span className="font-bold text-xs uppercase tracking-widest">Nouveau Job</span>
              </Button>
              <JobForm setAuthFormIsOpen={setJobFormIsOpen} />
            </Dialog>
          </div>

          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <SidebarMenuItem key={item.label} className="mb-1">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={`h-11 px-4 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? "bg-primary/10 text-primary font-bold shadow-sm" 
                        : "hover:bg-muted font-medium text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Link to={item.href} className="flex items-center gap-x-3">
                      <item.icon className={`size-5 ${isActive ? "text-primary" : "opacity-70"}`} />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <Separator className="mx-4 my-4 opacity-30" />

        <SidebarGroup>
          <p className="px-5 mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
            Préférences
          </p>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="h-11 px-4 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
              >
                <SunMoon className="size-5 opacity-70" />
                <span className="text-sm">Thème {theme === "light" ? "sombre" : "clair"}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="h-11 px-4 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all">
                <Settings className="size-5 opacity-70" />
                <span className="text-sm">Paramètres</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/30 bg-muted/20">
        <div className="flex items-center gap-x-3 px-2 mb-4">
          <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-lg ring-2 ring-background">
            <User className="size-6" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-black truncate leading-none mb-1">Candidat</span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Pro plan</span>
          </div>
        </div>
        
        <Button
          variant="destructive"
          className="w-full h-11 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-destructive/10 hover:shadow-destructive/20 transition-all gap-x-2"
          onClick={handleLogout}
        >
          <LogOut size={14} />
          Déconnexion
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
