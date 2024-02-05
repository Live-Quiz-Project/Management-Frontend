import useTypedSelector from "@/common/hooks/useTypedSelector";
import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function RequiredAuth() {
  const location = useLocation();
  const auth = useTypedSelector((state) => state.auth);

  if (!auth.value.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
