import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, Eye, EyeOff, Edit3, Save, X, Mail, Shield } from "lucide-react";
import type { MyProfileUiProps } from "@/types/MyProfileUiProps.type";

const MyProfileUi: React.FC<MyProfileUiProps> = ({
	myProfile,
	isEditing,
	isUpdating,
	showPassword,
	profileInfo,
	formFields,
	initial,
	name,
	email,
	role,
	is_verified,
	onEditClick,
	onSubmit,
	onChange,
	onTogglePasswordVisibility,
	onCancelEdit,
}) => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 py-8 px-4 md:py-12 md:px-8">
			<div className="max-w-5xl mx-auto">
				<div className="mb-8">
					<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">My Profile</h1>
					<p className="text-muted-foreground text-lg">Manage your account information and preferences</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-1">
						<Card className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-2xl overflow-hidden sticky top-8 py-0">
							<CardHeader className="p-8 text-center bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
								<div className="flex flex-col items-center gap-6">
									<div className="relative">
										<Avatar className="h-28 w-28 border-4 border-primary/30 shadow-lg transition-all duration-300 hover:scale-105 hover:border-primary/50">
											<AvatarImage src={myProfile.avatarUrl || "/placeholder.svg"} alt={name} />
											<AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-2xl font-bold">
												{initial}
											</AvatarFallback>
										</Avatar>
										{is_verified && (
											<div className="absolute -bottom-1 -right-1 rounded-full bg-background p-1.5 shadow-md border border-border/40">
												<CheckCircle className="h-5 w-5 text-green-500 fill-green-100 dark:fill-green-950" />
											</div>
										)}
									</div>

									<div className="space-y-3 w-full">
										<h2 className="text-2xl font-bold text-foreground text-balance">{name}</h2>
										<div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
											<Mail className="h-4 w-4 flex-shrink-0" />
											<span className="truncate">{email}</span>
										</div>
										<Badge
											variant="secondary"
											className="w-full justify-center py-2 rounded-lg flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20"
										>
											<Shield className="size-10" />
											{role}
										</Badge>
									</div>
								</div>
							</CardHeader>
						</Card>
					</div>

					<div className="lg:col-span-2">
						<Card className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-2xl overflow-hidden">
							<CardContent className="p-8">
								{isEditing ? (
									<form onSubmit={onSubmit} className="space-y-8">
										<div>
											<h3 className="text-xl font-semibold text-foreground mb-6">Edit Profile Information</h3>
											<Separator className="bg-border/40 mb-6" />
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											{formFields.map((field) => (
												<div key={field.name} className="relative group">
													<label htmlFor={field.name} className="block text-sm font-medium text-foreground mb-3 ml-1">
														{field.placeholder}
													</label>
													<div className="relative">
														<Input
															id={field.name}
															name={field.name}
															value={field.value}
															onChange={onChange}
															placeholder={field.placeholder}
															type={field.type}
															className="bg-muted/40 text-foreground border-border/60 py-6 px-4 rounded-xl focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all duration-200 text-base placeholder:text-muted-foreground/50"
														/>
														{field.hasEye && (
															<Button
																type="button"
																variant="ghost"
																size="icon"
																className="absolute right-2 top-1/2 transform -translate-y-1/2 h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
																onClick={() => onTogglePasswordVisibility(field.name as keyof typeof showPassword)}
															>
																{showPassword[field.name as keyof typeof showPassword] ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
															</Button>
														)}
													</div>
												</div>
											))}
										</div>

										<Separator className="bg-border/40" />

										<div className="flex flex-col-reverse sm:flex-row gap-4 justify-end pt-4">
											<Button
												type="button"
												variant="outline"
												onClick={onCancelEdit}
												className="border-border/60 hover:bg-muted/50 text-foreground flex items-center justify-center gap-2 py-6 px-6 rounded-xl font-medium transition-all duration-200 bg-transparent"
											>
												<X className="h-5 w-5" />
												Cancel
											</Button>
											<Button
												type="submit"
												disabled={isUpdating}
												className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2 py-6 px-8 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
											>
												{isUpdating ? (
													<>
														<div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
														Saving...
													</>
												) : (
													<>
														<Save className="h-5 w-5" />
														Save Changes
													</>
												)}
											</Button>
										</div>
									</form>
								) : (
									<>
										<div className="mb-8">
											<h3 className="text-xl font-semibold text-foreground mb-6">Profile Information</h3>
											<Separator className="bg-border/40" />
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
											{profileInfo.map((info) => (
												<div
													key={info.label}
													className={`p-6 bg-muted/20 rounded-xl border border-border/40 hover:border-border/60 transition-all duration-200 ${info.colSpan}`}
												>
													<div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
														<span className="font-medium">{info.label}</span>
													</div>
													{info.badge ? (
														<div className="flex items-center gap-3">
															<Badge
																className={`text-base py-2 px-4 rounded-lg font-medium ${
																	is_verified
																		? "bg-green-500/15 text-green-700 dark:text-green-300 border border-green-500/30"
																		: "bg-red-500/15 text-red-700 dark:text-red-300 border border-red-500/30"
																}`}
																variant="secondary"
															>
																{info.value}
															</Badge>
															{is_verified ? (
																<CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
															) : (
																<XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
															)}
														</div>
													) : (
														<p className="text-foreground font-semibold text-lg">{info.value}</p>
													)}
												</div>
											))}
										</div>

										<Separator className="bg-border/40 mb-8" />

										<div className="flex justify-end">
											<Button
												onClick={onEditClick}
												className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 py-6 px-8 rounded-xl font-medium transition-all duration-200"
											>
												<Edit3 className="h-5 w-5" />
												Edit Profile
											</Button>
										</div>
									</>
								)}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyProfileUi;
