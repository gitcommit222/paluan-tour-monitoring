"use client";
import { useFetchUser } from "@/hooks/useAuth";
import { useGetTouristByResortId } from "@/hooks/useGuest";
import {
	useCreateRating,
	useFetchRatingsByResort,
	useUpdateRating,
	useDeleteRating,
} from "@/hooks/useReview";
import { useFetchSingleSpot, useFetchSpotImages } from "@/hooks/useSpot";
import { Carousel, Rating, Tooltip } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoArrowBackCircle } from "react-icons/io5";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { logo } from "@/public";

const getInitials = (name) => {
	if (!name) return "?";
	return name
		.split(" ")
		.map((word) => word[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
};

const ResortPage = ({ params }) => {
	const { resortId } = params;
	const [userRating, setUserRating] = useState(0);
	const [comment, setComment] = useState("");
	const { data: spot } = useFetchSingleSpot(resortId);
	const router = useRouter();

	const { data: spotImages } = useFetchSpotImages(resortId);

	console.log(spotImages);

	const { data: user } = useFetchUser();

	const { data: ratings } = useFetchRatingsByResort(resortId);

	const { mutateAsync: createReview, isLoading: isCreatingReview } =
		useCreateRating();

	const { mutateAsync: updateReview, isLoading: isUpdatingReview } =
		useUpdateRating();

	const { mutateAsync: deleteReview } = useDeleteRating();

	const [editingReview, setEditingReview] = useState(null);
	const [guestRatingCode, setGuestRatingCode] = useState("");

	const handleAddReview = async () => {
		try {
			if (!guestRatingCode) {
				toast.error("Guest rating code is required");
				return;
			}
			if (editingReview) {
				await toast.promise(
					updateReview({
						ratingId: editingReview.id,
						rating: userRating,
						comment,
					}),
					{
						loading: "Updating review...",
						success: "Review updated successfully",
						error: "Failed to update review",
					}
				);
			} else {
				await toast.promise(
					createReview({
						resortId: parseInt(resortId),
						rating: userRating,
						comment,
						guestId: parseInt(user?.id),
						guestRatingCode,
					}),
					{
						loading: "Adding review...",
						success: "Review added successfully",
						error: "Failed to add review",
					}
				);
			}
			setUserRating(0);
			setGuestRatingCode("");
			setComment("");
			setEditingReview(null);
		} catch (error) {
			console.error("Review submission error:", error);
		}
	};

	const handleEditReview = (review) => {
		setEditingReview(review);
		setUserRating(review.rating);
		setComment(review.comment);
	};

	const handleDeleteReview = async (reviewId) => {
		try {
			await toast.promise(deleteReview(reviewId), {
				loading: "Deleting review...",
				success: "Review deleted successfully",
				error: "Failed to delete review",
			});
		} catch (error) {
			console.error("Delete review error:", error);
		}
	};

	const averageRating =
		ratings?.data?.length > 0
			? (
					ratings.data.reduce((acc, curr) => acc + curr.rating, 0) /
					ratings.data.length
			  ).toFixed(1)
			: 0;

	return (
		<section className="h-screen overflow-hidden">
			<div className="h-[60px] w-full bg-primary px-6 flex items-center gap-2">
				<Tooltip content="Back">
					<button
						onClick={() => router.back()}
						className="flex items-center gap-2"
					>
						<IoArrowBackCircle size={24} className="text-white" />
						<h1 className="text-white text-lg font-semibold">Back</h1>
					</button>
				</Tooltip>
			</div>
			<div className=" h-[calc(100vh-60px)]">
				<div className="flex h-full">
					<div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
						<div className="w-full h-[50%]">
							{(spot?.result?.thumbnail || spotImages?.data?.length > 0) && (
								<Carousel pauseOnHover>
									{spot?.result?.thumbnail && (
										<Image
											src={spot.result.thumbnail || logo}
											alt="Resort thumbnail"
											width={500}
											height={500}
											className="object-cover w-full h-full"
										/>
									)}
									{spotImages?.map((image, index) => (
										<Image
											key={index}
											src={image.imageUrl ? image.imageUrl : logo}
											alt={`Resort image ${index + 1}`}
											className="object-cover w-full h-full"
											width={500}
											height={500}
										/>
									))}
								</Carousel>
							)}
						</div>
						<div className="flex justify-between mt-2">
							<div>
								<h1 className="text-2xl  font-semibold">{spot?.result.name}</h1>
								<p className="text-gray-400 text-sm font-light">
									{spot?.result.description}
								</p>
							</div>
							<div className="flex justify-center flex-col items-start">
								<Rating>
									{[...Array(5)].map((_, index) => (
										<Rating.Star
											key={index}
											className={
												index < Math.floor(averageRating)
													? "text-secondary"
													: "text-accent"
											}
											filled={true}
										/>
									))}
								</Rating>
								<p className="text-gray-400 text-sm font-light">
									{ratings?.data?.length > 0
										? `${averageRating} (${ratings.data.length} rating/s)`
										: "No ratings yet"}
								</p>
							</div>
						</div>

						<div className="mt-8 border-t pt-4">
							<h2 className="text-xl font-semibold mb-4">
								{editingReview ? "Edit Review" : "Leave a Review"}
							</h2>

							<div
								className={`mb-4 ${
									!user ? "opacity-50 pointer-events-none" : ""
								}`}
							>
								<p className="mb-2">
									{!user ? "Please login to rate" : "Rate your experience:"}
								</p>
								<Rating>
									{[...Array(5)].map((_, index) => (
										<Rating.Star
											key={index}
											className={
												index < userRating
													? "text-secondary cursor-pointer"
													: "text-accent cursor-pointer"
											}
											filled={index < userRating}
											onClick={() => setUserRating(index + 1)}
										/>
									))}
								</Rating>
							</div>

							<input
								type="text"
								className="w-full p-3 border rounded-lg text-[14px] mb-2"
								placeholder="Enter guest rating code"
								value={guestRatingCode}
								onChange={(e) => setGuestRatingCode(e.target.value)}
								disabled={!user}
							/>

							<textarea
								className="w-full p-3 border rounded-lg resize-none text-[14px]"
								rows={4}
								color="gray"
								placeholder={
									userRating
										? "Share your experience..."
										: "Please rate first to leave a comment"
								}
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								disabled={!userRating || !user}
							/>
							<button
								className={`mt-2 px-4 py-2 rounded-lg ${
									userRating && guestRatingCode
										? "bg-primary text-white hover:bg-primary/90"
										: "bg-gray-300 text-gray-500 cursor-not-allowed"
								}`}
								disabled={
									!userRating ||
									!user ||
									isCreatingReview ||
									isUpdatingReview ||
									!guestRatingCode
								}
								onClick={handleAddReview}
							>
								{isCreatingReview || isUpdatingReview
									? "Submitting..."
									: editingReview
									? "Update Review"
									: "Submit Review"}
							</button>
							{editingReview && (
								<button
									className="mt-2 ml-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
									onClick={() => {
										setEditingReview(null);
										setUserRating(0);
										setComment("");
									}}
								>
									Cancel
								</button>
							)}
						</div>
					</div>
					<div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
						<h2 className="text-xl font-semibold mb-4">
							Reviews & Ratings ({ratings?.data?.length || 0})
						</h2>
						{ratings?.data?.map((review, index) => (
							<div key={index} className="mb-4 border-b pb-4">
								<div className="flex items-center justify-between mb-2">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
											{getInitials(review.guest?.name)}
										</div>
										<div className="flex flex-col">
											<span className="font-semibold">
												{review.guest?.name || "Anonymous"}
											</span>
											<div className="flex items-center gap-2">
												<Rating>
													{[...Array(5)].map((_, idx) => (
														<Rating.Star
															key={idx}
															className={
																idx < Math.floor(review.rating)
																	? "text-secondary"
																	: "text-accent"
															}
															filled={true}
															size="sm"
														/>
													))}
												</Rating>
												<p className="text-gray-400 text-sm font-light">
													{review.rating} Rating
												</p>
											</div>
										</div>
									</div>
									{user && user?.id === review.guest?.id && (
										<div className="flex gap-2">
											<Tooltip content="Edit">
												<button
													onClick={() => handleEditReview(review)}
													className="p-2 hover:bg-gray-100 rounded-full"
												>
													<FiEdit2 className="text-gray-600" size={16} />
												</button>
											</Tooltip>
											<Tooltip content="Delete">
												<button
													onClick={() => handleDeleteReview(review.id)}
													className="p-2 hover:bg-gray-100 rounded-full"
												>
													<FiTrash2 className="text-red-500" size={16} />
												</button>
											</Tooltip>
										</div>
									)}
								</div>
								<div className="ml-[52px]">
									<p className="text-gray-600">{review.comment}</p>
									<span className="text-sm text-gray-400">
										{new Date(review.createdAt).toLocaleDateString()}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ResortPage;
