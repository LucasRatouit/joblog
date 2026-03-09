import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Dashboard from "./pages/dashboard.tsx";
import Applications from "./pages/applications.tsx";
import Stats from "./pages/stats.tsx";
import DemoPage from "./pages/demo.tsx";
import DemoApplications from "./pages/demo-applications.tsx";
import DemoStats from "./pages/demo-stats.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/applications",
    element: <Applications />,
  },
  {
    path: "/stats",
    element: <Stats />,
  },
  {
    path: "/demo",
    element: <DemoPage />,
  },
  {
    path: "/demo-applications",
    element: <DemoApplications />,
  },
  {
    path: "/demo-stats",
    element: <DemoStats />,
  },
  {
    path: "*",
    element: <p>Not Found</p>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </SidebarProvider>
    </ThemeProvider>
  </StrictMode>
);
