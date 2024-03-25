import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import LibraryRoutes from "@/app/router/LibraryRoutes";
import MainLayout from "@/common/layouts/main";
import HistoryRoutes from "@/app/router/HistoryRoutes";

const Home = lazy(() => import("@/features/home"));

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
    children: HistoryRoutes,
  },
];

export default MainMenuRoutes;
