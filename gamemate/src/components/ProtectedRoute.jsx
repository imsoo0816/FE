import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  clearAuthData,
  getAccessToken,
  getRefreshToken,
  refreshAccessToken,
} from "../api/ApiClient";

const ProtectedRoute = () => {
  const location = useLocation();
  const [authStatus, setAuthStatus] = useState(() =>
    getAccessToken() ? "authenticated" : "checking",
  );

  useEffect(() => {
    let isMounted = true;
    const handleLogout = () => {
      if (isMounted) {
        setAuthStatus("unauthenticated");
      }
    };

    const checkAuth = async () => {
      if (getAccessToken()) {
        setAuthStatus("authenticated");
        return;
      }

      if (!getRefreshToken()) {
        clearAuthData();
        setAuthStatus("unauthenticated");
        return;
      }

      try {
        await refreshAccessToken();

        if (isMounted) {
          setAuthStatus("authenticated");
        }
      } catch {
        if (isMounted) {
          setAuthStatus("unauthenticated");
        }
      }
    };

    checkAuth();
    window.addEventListener("auth:logout", handleLogout);

    return () => {
      isMounted = false;
      window.removeEventListener("auth:logout", handleLogout);
    };
  }, [location.pathname]);

  if (authStatus === "checking") {
    return null;
  }

  if (authStatus === "unauthenticated") {
    return (
      <Navigate
        replace
        to="/"
        state={{
          redirectTo: `${location.pathname}${location.search}`,
        }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
