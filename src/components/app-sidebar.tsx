import * as React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import logo from "/public/logo.png";

import { FiChevronDown, FiBell, FiList } from "react-icons/fi";
import { ModeToggle } from "@/layout/ModeToggler";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { authApi, useLogoutUserMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";
import type { TRole } from "@/types/auth.type";
import { getIcon } from "@/utils/getIcon";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { data: userData } = useGetMyProfileQuery(undefined);
	const location = useLocation();
	const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>({});

	const role = userData?.data.role;
	const data = {
		navMain: getSidebarItems(role as TRole),
	};
	const [logout] = useLogoutUserMutation();
	const dispatch = useDispatch();

	const handleLogout = async () => {
		try {
			await logout().unwrap();
			dispatch(authApi.util.resetApiState());
			toast.success("Logout successfully!");
		} catch (err) {
			console.error("Failed to logout:", err);
			handleApiError(err);
		}
	};

	const toggleGroup = (title: string) => {
		setExpandedGroups((prev) => ({
			...prev,
			[title]: !prev[title],
		}));
	};

	return (
		<Sidebar
			{...props}
			className="transition-all duration-300 w-64 bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-800"
		>
			{/* Header */}
			<SidebarHeader className="items-center p-4 border-b border-gray-200 dark:border-gray-800">
				<div className="flex items-center justify-between w-full">
					<Link to={`/${role?.toLocaleLowerCase()}/dashboard`} className="flex items-center space-x-2">
						<img src={logo} alt="WalletApp Logo" className="size-8 object-cover" />
						<span className="text-xl font-bold text-gray-900 dark:text-white">PayWallet</span>
					</Link>
				</div>
			</SidebarHeader>

			{/* User info */}
			<div className="p-4 border-b border-gray-200 dark:border-gray-800">
				<div className="flex items-center space-x-3">
					<div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
						{userData?.data.name?.charAt(0) || "U"}
					</div>
					<div className="flex-1 min-w-0">
						<p className="font-medium truncate">{userData?.data.name || "User"}</p>
						<p className="text-sm text-gray-500 dark:text-gray-400 truncate">{userData?.data.role || "Member"}</p>
					</div>
					<button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
						<FiBell className="text-gray-600 dark:text-gray-300" />
					</button>
				</div>
			</div>

			{/* Navigation */}
			<SidebarContent className="custom-scrollbar">
				{data.navMain.map((group) => (
					<SidebarGroup key={group.title} className="border-none">
						<SidebarGroupLabel
							className="flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer"
							onClick={() => toggleGroup(group.title)}
						>
							<span>{group.title}</span>
							<FiChevronDown className={`transform transition-transform ${expandedGroups[group.title] ? "rotate-0" : "-rotate-90"}`} />
						</SidebarGroupLabel>

						<SidebarGroupContent className={expandedGroups[group.title] ? "" : "hidden"}>
							<SidebarMenu>
								{group.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											size="default"
											asChild
											className={`mx-2 my-1 rounded-md transition-all duration-200 ${
												location.pathname === item.url
													? "bg-primary text-white shadow-sm"
													: "text-gray-700 dark:text-gray-200 hover:bg-primary/80 dark:hover:bg-gray-800"
											}`}
										>
											<Link to={item.url} className="flex items-center px-4 py-3">
												<span className="mr-3 text-lg">
													{(() => {
														const IconComponent = getIcon(item.icon);
														return IconComponent ? <IconComponent /> : <FiList />;
													})()}
												</span>
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>

			{/* Footer */}
			<div className="mt-auto p-4 flex items-center justify-between border-t  border-gray-200 dark:border-gray-800">
				<Button
					onClick={handleLogout}
					className="cursor-pointer text-red-500 hover:text-red-400 focus:text-red-300 dark:text-red-400 dark:hover:text-red-300"
					variant="ghost"
				>
					<LogOutIcon size={16} className="mr-2" />
					Logout
				</Button>
				<ModeToggle />
			</div>

			<SidebarRail />

			<style>
				{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
          }
          .dark .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #475569;
          }
        `}
			</style>
		</Sidebar>
	);
}
