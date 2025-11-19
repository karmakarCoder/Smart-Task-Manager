import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Projects from "../pages/Projects";
import Task from "../pages/Task";
import Teams from "../pages/Teams";
import NotFound from "../pages/NotFound";
import Protected from "./Protected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <MainLayout />
      </Protected>
    ),
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/projects", element: <Projects /> },
      { path: "/task", element: <Task /> },
      { path: "/teams", element: <Teams /> },
    ],
  },

  { path: "*", element: <NotFound /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);
