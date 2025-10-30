import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Dashboard from "./pages/dashboard.tsx";
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
