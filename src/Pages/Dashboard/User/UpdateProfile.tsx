/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner"; // or shadcn/ui toast

// ✅ import your redux hooks
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from "@/redux/api/userApi";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();

  // State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  // Get profile data
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useGetMyProfileQuery();

  const myProfile = profileData?.data?.data;

  // Update profile mutation
  const [updateProfile, { isLoading: isUpdateLoading }] =
    useUpdateMyProfileMutation();

  // Prefill form when profile data loads
  useEffect(() => {
    if (myProfile) {
      setName(myProfile.name || "");
      setPhone(myProfile.phone || "");
      setAddress(myProfile.address || "");
    }
  }, [myProfile]);

  // Submit handler
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateData: Record<string, string> = {};
    if (name !== myProfile?.name) updateData.name = name;
    if (phone !== myProfile?.phone) updateData.phone = phone;
    if (address !== myProfile?.address) updateData.address = address;
    if (password) updateData.password = password;

    if (Object.keys(updateData).length === 0) {
      toast.info("⚠️ No changes to update.");
      return;
    }

    try {
      await updateProfile(updateData).unwrap();

      toast.success("✅ Profile updated successfully!");
      navigate("/my-profile"); // redirect
    } catch (error: any) {
      console.error("Update failed:", error);
      toast.error(error?.data?.message || "❌ Failed to update profile.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  if (isProfileLoading) return <p>Loading profile...</p>;
  if (isProfileError) return <p>Failed to load profile.</p>;

  return (
    <div className="flex justify-center items-center min-h-screen p-4 sm:p-8 bg-white text-black dark:bg-black dark:text-white transition-colors duration-500">
      <Card className="w-full max-w-md shadow-xl rounded-xl border-2 border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Update Profile</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Update your account information and password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={passwordType}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-7 h-8 px-2"
                onClick={togglePasswordVisibility}
              >
                {passwordType === "password" ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 dark:bg-pink-400 dark:hover:bg-pink-500 text-white"
              disabled={isUpdateLoading}
            >
              {isUpdateLoading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateProfile;
