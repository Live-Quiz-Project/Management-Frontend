import MainLayout from "@/common/layouts/main";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Library = lazy(() => import("@/features/library/pages"));
const QuizEditor = lazy(() => import("@/features/library/pages/QuizEditor"));

const LibraryRoutes: RouteObject[] = [
  {
    path: "",
    element: (
      <MainLayout>
        <Library />
      </MainLayout>
    ),
  },
  {
    path: "quiz",
    children: [
      {
        path: ":id",
        element: <QuizEditor />,
      },
    ],
  },
];

export default LibraryRoutes;
