import AuthLayout from "@/common/layouts/auth";
import RequiredAuth from "@/common/components/RequiredAuth";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainMenuRoutes from "./MainMenuRoutes";

const Login = lazy(() => import("@/features/auth/Login"));
const Register = lazy(() => import("@/features/auth/Register"));
const ForgotPassword = lazy(() => import("@/features/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/features/auth/ResetPassword"));
const VerifyOTP = lazy(() => import("@/features/auth/VerifyOTP"));

const router = createBrowserRouter([
  {
    path: "login",
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "register",
    element: (
      <AuthLayout>
        <Register />
      </AuthLayout>
    ),
  },
  {
    path: "forgot",
    element: (
      <AuthLayout>
        <ForgotPassword />
      </AuthLayout>
    ),
  },
  {
    path: "reset",
    element: (
      <AuthLayout>
        <ResetPassword />
      </AuthLayout>
    ),
  },
  {
    path: "verify-otp",
    element: (
      <AuthLayout>
        <VerifyOTP />
      </AuthLayout>
    ),
  },
  {
    path: "",
    element: <RequiredAuth />,
    children: MainMenuRoutes,
  },
]);

export default router;
