import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider } from "./components/theme-provider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <p>Dashboard</p>,
  },
  {
    path: "auth",
    // Component: () => <p>Auth Page</p>,
    children: [
      { path: "login", element: <p>Login Page</p> },
      { path: "register", element: <p>Register Page</p> },
    ],
  },
  {
    path: "*",
    element: <p>Not Found</p>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="joblog-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
