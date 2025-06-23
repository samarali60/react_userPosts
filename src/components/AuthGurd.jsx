import { isTokenExpire } from "@/api";
import { useAuthStore } from "@/store/auth";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthGurdRoute = () => {
  const { pathname } = useLocation();
  const { token, clear, refreshToken } = useAuthStore();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!token || isTokenExpire(refreshToken)) {
      clear();
      setShouldRedirect(true);
    }
  }, [token, refreshToken]);

  if (shouldRedirect) {
    return <Navigate to={`/login?redirectTo=${pathname}`} replace />;
  }

  return <Outlet />;
};

export default AuthGurdRoute;
