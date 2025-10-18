import { useState } from "react";
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from "@/redux/api/userApi";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/handleApiError";
import { ProfileSkeleton } from "@/components/ProfileSkeleton";
import MyProfileUi from "./MyProfileUi";

const MyProfile = () => {
	const { data, isFetching, isError } = useGetMyProfileQuery();
	const [updateProfile, { isLoading: isUpdating }] = useUpdateMyProfileMutation();
	const [isEditing, setIsEditing] = useState(false);
	const [showPassword, setShowPassword] = useState({
		newPassword: false,
		confirmPassword: false,
	});

	// Using optional chaining to safely access data
	const myProfile = data?.data?.data;

	const [form, setForm] = useState({
		name: "",
		phone: "",
		address: "",
		newPassword: "",
		confirmPassword: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const togglePasswordVisibility = (field: keyof typeof showPassword) => {
		setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
	};

	if (isFetching) {
		return <ProfileSkeleton />;
	}

	if (isError || !myProfile) {
		return (
			<div className="flex justify-center items-center min-h-screen p-6 bg-background">
				<div className="w-full max-w-2xl shadow-2xl border-2 border-destructive/50 bg-card/80 backdrop-blur-sm rounded-lg p-6">
					<h2 className="text-destructive flex items-center gap-2 text-xl font-semibold">Error</h2>
					<p className="text-muted-foreground mt-2">Could not load profile. Please try again later.</p>
				</div>
			</div>
		);
	}

	const { name, email, role, phone, address, is_verified, createdAt } = myProfile;

	const initial = `${name ? name.charAt(0) : ""}`.toUpperCase();
	const formattedCreatedAt = new Date(createdAt ?? Date.now()).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const handleEditClick = () => {
		setIsEditing(true);
		setForm({
			name,
			phone: phone || "",
			address: address || "",
			newPassword: "",
			confirmPassword: "",
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (form.newPassword && form.newPassword !== form.confirmPassword) {
			toast.error("New password and confirm password do not match!");
			return;
		}

		const payload: Record<string, string> = {};
		if (form.name && form.name !== name) payload.name = form.name;
		if (form.phone !== phone) payload.phone = form.phone;
		if (form.address !== address) payload.address = form.address;
		if (form.newPassword) payload.password = form.newPassword;

		if (Object.keys(payload).length === 0) {
			toast.info("No changes detected");
			setIsEditing(false);
			return;
		}

		try {
			await updateProfile(payload).unwrap();
			toast.success("Profile updated successfully!");
			setIsEditing(false);
		} catch (error) {
			handleApiError(error);
		}
	};

	// Profile info fields for display mode
	const profileInfo = [
		{
			label: "Phone",
			value: phone || "Not provided",
			colSpan: "sm:col-span-1",
		},
		{
			label: "Address",
			value: address || "Not provided",
			colSpan: "sm:col-span-1",
		},
		{
			label: "Joined",
			value: formattedCreatedAt,
			colSpan: "sm:col-span-1",
		},
		{
			label: "Status",
			value: is_verified ? "Verified" : "Unverified",
			colSpan: "sm:col-span-1",
			badge: true,
		},
	];

	// Form fields for edit mode
	const formFields = [
		{
			name: "name",
			placeholder: "Full Name",
			type: "text",
			value: form.name,
		},
		{
			name: "phone",
			placeholder: "Phone",
			type: "text",
			value: form.phone,
		},
		{
			name: "address",
			placeholder: "Address",
			type: "text",
			value: form.address,
		},
		{
			name: "newPassword",
			placeholder: "New Password",
			type: showPassword.newPassword ? "text" : "password",
			value: form.newPassword,
			hasEye: true,
		},
		{
			name: "confirmPassword",
			placeholder: "Confirm Password",
			type: showPassword.confirmPassword ? "text" : "password",
			value: form.confirmPassword,
			hasEye: true,
		},
	];

	return (
		<MyProfileUi
			myProfile={myProfile}
			isEditing={isEditing}
			isUpdating={isUpdating}
			form={form}
			showPassword={showPassword}
			profileInfo={profileInfo}
			formFields={formFields}
			initial={initial}
			name={name}
			email={email}
			role={role}
			is_verified={is_verified}
			onEditClick={handleEditClick}
			onSubmit={handleSubmit}
			onChange={handleChange}
			onTogglePasswordVisibility={togglePasswordVisibility}
			onCancelEdit={() => setIsEditing(false)}
		/>
	);
};

export default MyProfile;
