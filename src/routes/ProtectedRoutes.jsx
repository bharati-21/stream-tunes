import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "contexts/";

const ProtectedRoutes = () => {
	const { isAuth } = useAuth();
	const location = useLocation();
    
	return isAuth ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export { ProtectedRoutes };
