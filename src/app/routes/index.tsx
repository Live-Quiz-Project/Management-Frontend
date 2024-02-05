import AuthLayout from "@/common/layouts/auth";
import MainLayout from "@/common/layouts/main";
import React from "react";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Login = lazy(() => import("@/features/auth/Login"));
const Register = lazy(() => import("@/features/auth/Register"));
const Home = lazy(() => import("@/features/home"));
const Library = lazy(() => import("@/features/library"));
const History = lazy(() => import("@/features/history"));
const Help = lazy(() => import("@/features/help"));
const Setting = lazy(() => import("@/features/setting"));
const HistoryDetail = lazy(() => import("@/features/history/HistoryDetail"))

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthLayout>
        <Register />
      </AuthLayout>
    ),
  },
  {
    path: "/",
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: "/library",
    element: (
      <MainLayout>
        <Library />
      </MainLayout>
    ),
  },
  {
    path: "/history",
    element: (
      <MainLayout>
        <History />
      </MainLayout>
    ),
  },
  {
    path: "/history/history-detail",
    element: 
    (
        <HistoryDetail />
    ),
  },
  {
    path: "/help",
    element: <Help />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
]);
