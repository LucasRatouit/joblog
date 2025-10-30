import { LogOut, PanelLeftClose, SunMoon } from "lucide-react";
import { userLogout } from "../api/services/user";
import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "./ui/sidebar";
import { useTheme } from "./theme-provider";

const AppSidebar = () => {
  const { theme, setTheme } = useTheme();
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold ml-2">
            Job<span className="text-primary">log</span>
          </h1>
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={toggleSidebar}
          >
            <PanelLeftClose className="size-5" />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* <SidebarGroup>
          <Card className="z-10 px-2 py-1 border-0 relative">
            <div
              className={`-z-10 w-full h-full bg-gradient-to-t ${statusGradientColor("pending")} rounded-lg absolute top-0 left-0`}
            />
            <div
              className={`z-10 w-full h-full bg-card rounded-lg absolute top-0 left-1`}
            />
            <p className="z-10 ml-2 space-x-2">
              <span className="font-bold text-lg">1</span>
              <span className="text-gray-400 font-medium text-sm">Test</span>
            </p>
          </Card>
        </SidebarGroup> */}
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <SunMoon size={16} />
          Changer de thème
        </Button>
        <Button
          variant="destructive"
          className="cursor-pointer"
          onClick={async () =>
            await userLogout().then(() => (window.location.href = "/"))
          }
        >
          <LogOut size={16} />
          Déconnexion
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
