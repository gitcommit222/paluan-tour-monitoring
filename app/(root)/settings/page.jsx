"use client";
import Headerbox from "@/components/shared/HeaderBox";
import { Button } from "flowbite-react";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { useState, useEffect } from "react";
import {
	useFetchUser,
	useUpdateProfile,
	useChangePassword,
} from "@/hooks/useAuth";
import { toast } from "react-hot-toast";

const Settings = () => {
	const { data: user } = useFetchUser();
	const { mutate: updateProfile, isLoading } = useUpdateProfile();
	const { mutate: changePassword, isLoading: isChangingPassword } =
		useChangePassword();

	const [profileData, setProfileData] = useState({
		name: "",
		email: "",
		phone: "",
		username: "",
	});

	const [passwordData, setPasswordData] = useState({
		oldPassword: "",
		newPassword: "",
	});

	// Pre-fill form with user data when it loads
	useEffect(() => {
		if (user) {
			setProfileData({
				name: user.name || "",
				email: user.email || "",
				phone: user.phone || "",
				username: user.username || "",
			});
		}
	}, [user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		updateProfile(profileData, {
			onSuccess: () => {
				toast.success("Profile updated successfully");
			},
		});
	};

	const handlePasswordChange = async (e) => {
		e.preventDefault();
		if (passwordData.newPassword.length < 8) {
			toast.error("Password must be at least 8 characters long");
			return;
		}

		changePassword(passwordData, {
			onSuccess: () => {
				toast.success("Password changed successfully");
				setPasswordData({ oldPassword: "", newPassword: "" });
			},
			onError: (error) => {
				toast.error(error.response?.data?.message || "Error changing password");
			},
		});
	};

	return (
		<>
			<Headerbox title="Settings" subtext="Manage your settings here." />
			<div className="flex flex-col gap-4">
				<Tabs aria-label="Settings tabs" variant="default">
					<Tabs.Item title="Edit Profile" icon={HiUserCircle}>
						<div className="border p-5 rounded-lg overflow-hidden">
							<h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
							<form onSubmit={handleSubmit} className="flex flex-col gap-4">
								<div className="flex flex-col gap-2">
									<label htmlFor="username">Username</label>
									<input
										type="text"
										id="username"
										value={profileData.username}
										onChange={(e) =>
											setProfileData({
												...profileData,
												username: e.target.value,
											})
										}
										className="rounded-lg"
									/>
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="name">Full Name</label>
									<input
										type="text"
										id="name"
										value={profileData.name}
										onChange={(e) =>
											setProfileData({ ...profileData, name: e.target.value })
										}
										className="rounded-lg"
									/>
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="email">Email</label>
									<input
										type="email"
										id="email"
										value={profileData.email}
										onChange={(e) =>
											setProfileData({ ...profileData, email: e.target.value })
										}
										className="rounded-lg"
									/>
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="phone">Phone Number</label>
									<input
										type="tel"
										id="phone"
										value={profileData.phone}
										onChange={(e) =>
											setProfileData({ ...profileData, phone: e.target.value })
										}
										className="rounded-lg"
									/>
								</div>
								<Button type="submit" disabled={isLoading}>
									{isLoading ? "Updating..." : "Update Profile"}
								</Button>
							</form>
						</div>
					</Tabs.Item>
					<Tabs.Item title="Change Password" icon={HiAdjustments}>
						<div className="border p-5 rounded-lg overflow-hidden">
							<h3 className="text-lg font-semibold mb-4">Change Password</h3>
							<form
								onSubmit={handlePasswordChange}
								className="flex flex-col gap-4"
							>
								<div className="flex flex-col gap-2">
									<label htmlFor="oldPassword">Old Password</label>
									<input
										type="password"
										id="oldPassword"
										value={passwordData.oldPassword}
										onChange={(e) =>
											setPasswordData({
												...passwordData,
												oldPassword: e.target.value,
											})
										}
										className="rounded-lg"
									/>
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="newPassword">New Password</label>
									<input
										type="password"
										id="newPassword"
										value={passwordData.newPassword}
										onChange={(e) =>
											setPasswordData({
												...passwordData,
												newPassword: e.target.value,
											})
										}
										className="rounded-lg"
									/>
								</div>
								<Button type="submit" disabled={isChangingPassword}>
									{isChangingPassword
										? "Changing Password..."
										: "Change Password"}
								</Button>
								<p className="text-red-500 text-sm">
									Note: Password must be at least 8 characters long.
								</p>
							</form>
						</div>
					</Tabs.Item>
				</Tabs>
			</div>
		</>
	);
};

export default Settings;
