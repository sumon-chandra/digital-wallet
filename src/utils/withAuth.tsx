import { useGetMyProfileQuery } from "@/redux/api/userApi";
import type { TRole } from "@/types/auth.type";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
	return function AuthWrapper() {
		const { data: profileData, isLoading } = useGetMyProfileQuery();

		if (!isLoading && !profileData?.data.email) {
			return <Navigate to="/login" />;
		}

		if (requiredRole && !isLoading && requiredRole !== profileData?.data?.role) {
			return <Navigate to="/unauthorized" />;
		}

		return <Component />;
	};
};
