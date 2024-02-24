import { ReactNode } from "react";
import LeftPanel from "@/common/layouts/auth/components/LeftPanel";
import { RouteProps, matchRoutes, useLocation } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  const location = useLocation();
  const routes = [
    "/login",
    "/register",
    "/forgot",
    "/reset",
    "/verify-otp",
  ].map((path) => ({
    path,
  }));
  const [{ route }] = matchRoutes(routes, location) as { route: RouteProps }[];

  return (
    <div className="grid grid-cols-[45fr_55fr]">
      <LeftPanel page={route.path?.slice(1)} />
      <div className="">{children}</div>
    </div>
  );
}
