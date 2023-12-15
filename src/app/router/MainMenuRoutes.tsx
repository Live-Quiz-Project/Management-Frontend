import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import LibraryRoutes from "./LibraryRoutes";
import MainLayout from "@/common/layouts/main";

const Home = lazy(() => import("@/features/home"));
const History = lazy(() => import("@/features/history"));
const Help = lazy(() => import("@/features/help"));
const Setting = lazy(() => import("@/features/setting"));

const MainMenuRoutes: RouteObject[] = [
  {
    path: "",
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: "library",
    children: LibraryRoutes,
  },
  {
    path: "history",
    element: (
      <MainLayout>
        <History />
      </MainLayout>
    ),
  },
  {
    path: "help",
    element: <Help />,
  },
  {
    path: "setting",
    element: <Setting />,
  },
];

export default MainMenuRoutes;
