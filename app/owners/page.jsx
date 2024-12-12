"use client";
import AddGuestForm from "@/components/AddGuestForm";
import OwnersTable from "@/components/OwnersTable";
import CustomModal from "@/components/shared/CustomModal";
import Headerbox from "@/components/shared/HeaderBox";
import SpotDetailsForm from "@/components/SpotDetailsForm";
import ProtectedRoutes from "@/hoc/ProtectedRoutes";
import { useFetchUser, useLogout, useChangePassword } from "@/hooks/useAuth";
import {
  useFetchResortByOwner,
  useAddSpotImage,
  useDeleteSpotImage,
  useFetchSpotImages,
} from "@/hooks/useSpot";
import { useFetchRatingsByResort } from "@/hooks/useReview";
import { logo } from "@/public";
import { getFirstWord } from "@/utils/getFirstWord";
import { Button, Label, Tabs, Textarea } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineExclamationCircle, HiTrash, HiPlus } from "react-icons/hi";
import GuestChartData from "@/components/GuestChartData";
import toast from "react-hot-toast";

const Home = () => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const { mutate: logout } = useLogout();
  const { data: user } = useFetchUser();
  const { data: resorts } = useFetchResortByOwner(user?.id);
  const [replyInputId, setReplyInputId] = useState(null);
  const { data: ratingsData } = useFetchRatingsByResort(
    resorts?.resorts[0]?.id
  );
  const { mutateAsync: addImage } = useAddSpotImage();
  const { mutateAsync: deleteImage } = useDeleteSpotImage();
  const { data: spotImages } = useFetchSpotImages(resorts?.resorts[0]?.id);
  const { mutateAsync: changePassword } = useChangePassword();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const computeAverageRating = (ratings) => {
    if (!ratings?.length) return 0;
    const sum = ratings.reduce((acc, review) => acc + review.rating, 0);
    return sum / ratings.length;
  };

  const averageRating = computeAverageRating(ratingsData?.data);

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    await toast.promise(
      changePassword({
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }),
      {
        loading: "Changing password...",
        success: "Password changed successfully!",
        error: "Failed to change password",
      }
    );
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <ProtectedRoutes roles={["resortOwner"]}>
      <section className="relative">
        <div className="w-full shadow-lg z-100 bg-gray-800 h-[80px] flex items-center justify-between px-[100px]">
          <div>
            <Image
              src={logo}
              alt="logo"
              height={150}
              width={150}
              className="object-contain"
            />
          </div>
          <nav>
            <ul>
              <CustomModal
                size="md"
                buttonName="LOGOUT"
                btnColor="secondary"
                handleLogout={() => logout()}
                mainContent={
                  <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to logout?
                    </h3>
                  </div>
                }
                type="logout"
              />
            </ul>
          </nav>
        </div>
        <div className="px-[100px] py-[25px]">
          <div className="mb-2">
            <Headerbox
              user={`${user ? getFirstWord(user.name) : "Owner"}!`}
              title="Welcome,"
              type="greeting"
              subtext={`Manage and view ${
                resorts ? resorts?.resorts[0]?.name : "your spot"
              } data here.`}
            />
            <p className="text-gray-500">
              Guest Rating Code:{" "}
              <span className="font-semibold text-black">
                {resorts?.resorts[0]?.guestRatingCode}
              </span>
            </p>
          </div>
          <Tabs color="gray">
            <Tabs.Item title="Dashboard">
              <GuestChartData resortId={resorts?.resorts[0]?.id} />
            </Tabs.Item>
            <Tabs.Item title="Guests">
              <div className="flex gap-2">
                <div className="flex-1">
                  <OwnersTable resortId={resorts?.resorts[0]?.id} />
                </div>
                <div className="border rounded-lg max-w-[350px] p-5 space-y-5">
                  <div className="flex justify-between items-center flex-wrap">
                    <h3 className="font-semibold text-[18px] mb-2">
                      Add Guests
                    </h3>
                    <div>
                      <p className="text-red-500 text-[14px]">
                        * required fields.
                      </p>
                    </div>
                  </div>
                  <AddGuestForm resortId={resorts?.resorts[0]?.id} />
                </div>
              </div>
            </Tabs.Item>
            <Tabs.Item title="Resort Details">
              {resorts ? (
                <SpotDetailsForm data={resorts && resorts?.resorts[0]} />
              ) : (
                <p className="text-center text-gray-500">No resort found.</p>
              )}
            </Tabs.Item>
            <Tabs.Item title="Ratings & Reviews">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-medium">
                    {ratingsData?.data?.length || 0} REVIEWS OF{" "}
                    {resorts?.resorts[0]?.name?.toUpperCase()}
                  </h2>
                  <div className="flex items-center">
                    <div className="text-yellow-400 text-2xl">
                      {"★".repeat(Math.floor(averageRating))}
                      {"☆".repeat(5 - Math.floor(averageRating))}
                    </div>
                    <span className="ml-2 text-gray-600">
                      {averageRating.toFixed(1)} rating based on{" "}
                      {ratingsData?.data?.length || 0} ratings
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  {ratingsData?.data?.map((review, index) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">
                            {index + 1}. By {review.guest.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleString()}
                          </p>
                          <div className="text-yellow-400">
                            {"★".repeat(review.rating)}
                            {"☆".repeat(5 - review.rating)}
                          </div>
                        </div>
                        <div>
                          {/* <button
                            onClick={() =>
                              setReplyInputId(
                                replyInputId === review.id ? null : review.id
                              )
                            }
                            className="text-blue-500 hover:underline"
                          >
                            {replyInputId === review.id
                              ? "Cancel"
                              : "Comment on this review"}
                          </button> */}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p>{review.comment}</p>
                        </div>
                        {replyInputId === review.id && (
                          <div className="flex flex-col justify-end items-end">
                            <Textarea
                              id={`reply-${review.id}`}
                              name={`reply-${review.id}`}
                              placeholder="Reply to this review..."
                              cols={50}
                              rows={4}
                            />
                            <Button className="mt-2" color="primary">
                              Send
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Tabs.Item>
            <Tabs.Item title="Images">
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-medium">Resort Images</h2>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      id="imageUpload"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          addImage({
                            resortId: resorts?.resorts[0]?.id,
                            file,
                          });
                        }
                      }}
                      accept="image/*"
                    />
                    <Button
                      color="primary"
                      size="lg"
                      onClick={() =>
                        document.getElementById("imageUpload").click()
                      }
                      className="px-6"
                    >
                      <HiPlus className="mr-2 text-xl" /> Add Image
                    </Button>
                  </div>
                </div>

                {spotImages?.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <HiPlus className="mx-auto text-4xl text-gray-400 mb-3" />
                    <p className="text-gray-500">
                      No images yet. Add some to showcase your resort!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {spotImages?.map((image) => (
                      <div
                        key={image.id}
                        className="relative group shadow-lg rounded-md"
                      >
                        <img
                          src={image.imageUrl}
                          alt="Resort"
                          className="w-full h-64 object-contain rounded-lg"
                        />
                        <button
                          onClick={() => deleteImage(image.id)}
                          className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <HiTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Tabs.Item>
            <Tabs.Item title="Change Password">
              <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-medium mb-6">Change Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <Button type="submit" color="primary" className="w-full">
                    Change Password
                  </Button>
                </form>
              </div>
            </Tabs.Item>
          </Tabs>
        </div>
      </section>
    </ProtectedRoutes>
  );
};

export default Home;
