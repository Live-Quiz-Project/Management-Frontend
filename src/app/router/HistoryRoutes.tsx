import MainLayout from "@/common/layouts/main";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const History = lazy(() => import("@/features/history"));
const HistoryDetail = lazy(() => import("@/features/history/HistoryDetail"));

const HistoryRoutes: RouteObject[] = [
  {
    path: "",
    element: (
      <MainLayout>
        <History />
      </MainLayout>
    ),
  },
  {
    path: "history-detail",
    element: (
      <MainLayout>
        <HistoryDetail />
      </MainLayout>
    ),
  },
];

export default HistoryRoutes;
