import { Link, useLocation } from "react-router-dom";
import { UserIcon, MenuIcon, LogOutIcon, AlignStartVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { authApi, useLogoutUserMutation } from "@/redux/api/authApi";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch } from "react-redux";
import { handleApiError } from "@/utils/handleApiError";
import { toast } from "sonner";
import { getDashboardPath } from "@/utils/getDashboardPath";
import { ModeToggle } from "./ModeToggler";
import { motion } from "framer-motion";
import logo from "/public/logo.png";

const navigationLinks = [
	{ href: "/", label: "Home" },
	{ href: "/about", label: "About" },
	{ href: "/feature", label: "Feature" },
	{ href: "/pricing", label: "Pricing" },
	{ href: "/faq", label: "FAQ" },
	{ href: "/contact", label: "Contact" },
];

export default function Navbar() {
	const { data: profileData, isLoading } = useGetMyProfileQuery();
	const [logout] = useLogoutUserMutation();
	const dispatch = useDispatch();
	const location = useLocation();
	const userData = profileData?.data;
	console.log("🧑‍💼 User Data in Navbar:", userData);

	const isAuthenticated = !!userData;

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

	return (
		<motion.header
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="fixed top-0 left-0 w-full border-b border-border bg-background/95 backdrop-blur-sm text-foreground z-50 px-4 md:px-6"
		>
			<div className="container flex h-16 items-center justify-between gap-4 mx-auto">
				{/* Left: Logo */}
				<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2">
					<Link to="/" className="text-xl font-bold flex items-center gap-2 relative group" style={{ color: "var(--primary)" }}>
						{/* Text with gradient animation */}
						<img src={logo} alt="PayWallet" className="size-6" />
						PayWallet
					</Link>
				</motion.div>

				{/* Middle: Navigation */}
				<NavigationMenu className="hidden md:flex">
					<NavigationMenuList className="gap-6">
						{navigationLinks.map((link, index) => {
							const isActive = location.pathname === link.href;

							return (
								<NavigationMenuItem key={index}>
									<Link
										to={link.href}
										className={`relative px-2 py-1 font-medium transition-colors
              ${
															isActive
																? "text-primary after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-primary"
																: "text-muted-foreground hover:text-foreground hover:after:absolute hover:after:left-0 hover:after:-bottom-1 hover:h-[2px] hover:w-full hover:after:bg-muted-foreground"
														}`}
									>
										{link.label}
									</Link>
								</NavigationMenuItem>
							);
						})}
					</NavigationMenuList>
				</NavigationMenu>

				{/* Right: Auth Section */}
				<div className="flex items-center gap-2">
					{isLoading ? (
						<div className="flex items-center gap-4">
							<Skeleton className="h-8 w-20 rounded-md bg-muted" />
							<Skeleton className="h-8 w-20 rounded-md bg-muted" />
						</div>
					) : !isAuthenticated ? (
						<>
							<Link to="/login">
								<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
									<Button variant="ghost" className="text-foreground ">
										Login
									</Button>
								</motion.div>
							</Link>
							<Link to="/signup">
								<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
									<Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Sign Up</Button>
								</motion.div>
							</Link>
							<ModeToggle />
						</>
					) : (
						<>
							<DropdownMenu>
								<DropdownMenuTrigger className="outline-none">
									<motion.div whileHover={{ scale: 1.05 }}>
										<Avatar className="border border-border cursor-pointer hover:border-primary transition-colors">
											<AvatarImage src={userData.photoUrl || "https://via.placeholder.com/40"} alt={userData.name} />
											<AvatarFallback className="bg-muted">
												<UserIcon className="text-muted-foreground" size={18} />
											</AvatarFallback>
										</Avatar>
									</motion.div>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="bg-card text-card-foreground border-border w-56">
									<DropdownMenuLabel className="flex flex-col p-4">
										<span className="font-semibold">{userData.name}</span>
										<span className="text-sm text-muted-foreground font-normal">{userData.email}</span>
									</DropdownMenuLabel>
									<DropdownMenuSeparator className="bg-border" />
									{userData && (
										<>
											<DropdownMenuItem asChild className="cursor-pointer focus:bg-secondary focus:text-foreground">
												<Link to={getDashboardPath(userData.role)} className="flex items-center gap-2">
													<AlignStartVertical size={16} />
													Dashboard
												</Link>
											</DropdownMenuItem>
										</>
									)}

									<DropdownMenuItem asChild className="cursor-pointer focus:bg-secondary focus:text-foreground"></DropdownMenuItem>
									<DropdownMenuSeparator className="bg-border" />
									<DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:bg-secondary focus:text-destructive">
										<LogOutIcon size={16} className="mr-2" />
										Logout
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<ModeToggle />
						</>
					)}
				</div>
				{/* Mobile Menu (Hamburger) */}
				<div className="md:hidden z-20">
					<Popover>
						<PopoverTrigger asChild>
							<motion.div whileTap={{ scale: 0.95 }}>
								<Button variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-transparent">
									<MenuIcon size={20} />
								</Button>
							</motion.div>
						</PopoverTrigger>
						<PopoverContent align="end" className="w-56 bg-card p-3 rounded-lg border-border">
							<div className="flex flex-col gap-2">
								{navigationLinks.map((link, index) => {
									const isActive = location.pathname === link.href;

									return (
										<Link
											key={index}
											to={link.href}
											className={`relative px-2 py-1 font-medium transition-colors hover:bg-transparent
                ${
																	isActive
																		? "text-primary after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-primary"
																		: "text-muted-foreground hover:text-foreground hover:after:absolute hover:after:left-0 hover:after:-bottom-1 hover:h-[2px] hover:w-full hover:after:bg-muted-foreground"
																}`}
										>
											{link.label}
										</Link>
									);
								})}
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</motion.header>
	);
}
