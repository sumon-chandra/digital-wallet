import App from "@/App";
import { role } from "@/constants/role";
import DashboardLayout from "@/layout/DashboardLayout";
import Login from "@/Pages/Auth/Login";
import Signup from "@/Pages/Auth/Signup";
import About from "@/Pages/Website/About/About";
import Contact from "@/Pages/Website/Contact/Contact";
import Faq from "@/Pages/Website/Faq/Faq";
import Feature from "@/Pages/Website/Feature/Feature";
import Home from "@/Pages/Website/Home/Home.tsx";
import Pricing from "@/Pages/Website/Pricing/Pricing";
import type { TRole } from "@/types/auth.type";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { generateRoutes } from "@/utils/generateRoutes";
import { userSidebarItems } from "./userSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import { adminSidebarItems } from "./adminSidebarItems";
import Unauthorized from "@/components/Unauthorized";
import ErrorPage from "@/components/ErrorPage";

export const router = createBrowserRouter([
	{
		Component: App,
		path: "/",
		errorElement: <ErrorPage />, // 👈 This catches route errors
		children: [
			{
				Component: Home,
				path: "/",
			},
			{
				Component: About,
				path: "about",
			},
			{
				Component: Feature,
				path: "feature",
			},
			{
				Component: Pricing,
				path: "pricing",
			},
			{
				Component: Faq,
				path: "faq",
			},
			{
				Component: Contact,
				path: "contact",
			},
			{
				Component: Login,
				path: "login",
			},
			{
				Component: Signup,
				path: "signup",
			},
		],
	},
	{
		Component: withAuth(DashboardLayout, role.admin as TRole),
		path: "/admin/dashboard",
		children: [
			{
				index: true,
				element: <Navigate to="/admin/dashboard/quick-actions" />,
			},
			...generateRoutes(adminSidebarItems),
		],
	},
	{
		Component: withAuth(DashboardLayout, role.agent as TRole),
		path: "/agent/dashboard",
		children: [
			{
				index: true,
				element: <Navigate to="/agent/dashboard/quick-actions" />,
			},
			...generateRoutes(agentSidebarItems),
		],
	},
	{
		Component: withAuth(DashboardLayout, role.user as TRole),
		path: "/user/dashboard",
		children: [{ index: true, element: <Navigate to="/user/dashboard/quick-actions" /> }, ...generateRoutes(userSidebarItems)],
	},
	{
		Component: Unauthorized,
		path: "/unauthorized",
	},
]);
