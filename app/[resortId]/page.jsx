"use client";
import { useFetchUser } from "@/hooks/useAuth";
import {
	useCreateRating,
	useFetchRatingsByResort,
	useUpdateRating,
	useDeleteRating,
} from "@/hooks/useReview";
import { useFetchSingleSpot, useFetchSpotImages } from "@/hooks/useSpot";
import { Carousel, Rating, Tooltip, Modal } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoArrowBackCircle, IoExpand, IoChevronForward } from "react-icons/io5";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { logo } from "@/public";
import { getBarangayByMun, getCityMunByProvince } from "phil-reg-prov-mun-brgy";

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

	const { data: user } = useFetchUser();

	const { data: ratings } = useFetchRatingsByResort(resortId);

	const { mutateAsync: createReview, isLoading: isCreatingReview } =
		useCreateRating();

	const { mutateAsync: updateReview, isLoading: isUpdatingReview } =
		useUpdateRating();

	const { mutateAsync: deleteReview } = useDeleteRating();

	const [editingReview, setEditingReview] = useState(null);
	const [guestRatingCode, setGuestRatingCode] = useState("");
	const [isFullView, setIsFullView] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isReviewsOpen, setIsReviewsOpen] = useState(true);

	const allImages = [
		...(spot?.result?.thumbnail ? [spot.result.thumbnail] : []),
		...(spotImages?.map((img) => img.imageUrl) || []),
	];

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

	const barangays = getBarangayByMun(175107);

	const barangay = barangays[spot?.result.Address?.barangay];

	return (
		<section className="h-screen overflow-hidden">
			<div className="h-[60px] w-full bg-primary px-4 sm:px-6 flex items-center gap-2">
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
			<div className="h-[calc(100vh-60px)]">
				<div className="flex flex-col lg:flex-row h-full">
					<div
						className={`flex-1 p-2 sm:p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 ${
							!isReviewsOpen ? "md:flex-[0.85]" : ""
						} lg:flex-[0.7]`}
					>
						<div className="w-full h-[400px] md:h-[500px] lg:h-[65vh] relative">
							{(spot?.result?.thumbnail || spotImages?.data?.length > 0) && (
								<>
									<Carousel pauseOnHover>
										{spot?.result?.thumbnail && (
											<Image
												src={spot.result.thumbnail || logo}
												alt="Resort thumbnail"
												width={1920}
												height={1080}
												className="object-cover w-full h-full"
											/>
										)}
										{spotImages?.map((image, index) => (
											<Image
												key={index}
												src={image.imageUrl ? image.imageUrl : logo}
												alt={`Resort image ${index + 1}`}
												className="object-cover w-full h-full"
												width={1920}
												height={1080}
											/>
										))}
									</Carousel>
									<button
										onClick={() => setIsFullView(true)}
										className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
									>
										<IoExpand className="text-white" size={20} />
									</button>
								</>
							)}
						</div>
						<div className="flex flex-col sm:flex-row justify-between mt-2 gap-4">
							<div>
								<h1 className="text-xl sm:text-2xl font-semibold">
									{spot?.result.name}
								</h1>
								<p className="text-gray-400 text-sm font-light">
									{spot?.result.description}
								</p>
								<p className="text-gray-500 text-sm mt-2 flex items-center gap-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
									{`${spot?.result?.Address.street}, Brgy. ${barangay?.name}, Paluan, Occidental Mindoro` ||
										"No address provided"}
								</p>
								{spot?.result?.longitude && spot?.result?.latitude && (
									<p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-4 w-4"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
											/>
										</svg>
										{`Coordinates: ${spot.result.latitude}°N, ${spot.result.longitude}°E`}
									</p>
								)}
							</div>
							<div className="flex justify-start sm:justify-center flex-col items-start">
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

						<div className="mt-4 lg:mt-8 border-t pt-4">
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

							{/* Location Map Section */}
							{spot?.result?.longitude && spot?.result?.latitude && (
								<div className="mt-8 border-t pt-8">
									<h2 className="text-2xl font-semibold mb-6">Location</h2>
									<div className="w-full h-[450px] rounded-lg overflow-hidden shadow-md">
										<iframe
											src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${spot.result.longitude}!3d${spot.result.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sph!4v1742724501974!5m2!1sen!2sph`}
											width="100%"
											height="100%"
											style={{ border: 0 }}
											allowFullScreen=""
											loading="lazy"
											referrerPolicy="no-referrer-when-downgrade"
										/>
									</div>
								</div>
							)}
						</div>
					</div>

					<div
						className={`transition-all duration-300 ${
							isReviewsOpen
								? "md:flex-[0.15] lg:flex-[0.3]"
								: "md:flex-[0.15] lg:flex-[0.3]"
						} relative`}
					>
						<button
							onClick={() => setIsReviewsOpen(!isReviewsOpen)}
							className="hidden md:flex lg:hidden absolute -left-4 top-1/2 -translate-y-1/2 bg-white border shadow-md rounded-full p-2 z-10 hover:bg-gray-50"
						>
							<IoChevronForward
								size={20}
								className={`transform transition-transform ${
									isReviewsOpen ? "rotate-180" : ""
								}`}
							/>
						</button>

						<div
							className={`h-full p-2 sm:p-4 overflow-y-auto border-t lg:border-t-0 lg:border-l scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 ${
								!isReviewsOpen ? "md:hidden lg:block" : ""
							}`}
						>
							<h2 className="text-lg sm:text-xl font-semibold mb-4">
								Reviews & Ratings ({ratings?.data?.length || 0})
							</h2>
							{ratings?.data?.map((review, index) => (
								<div key={index} className="mb-3 sm:mb-4 border-b pb-3 sm:pb-4">
									<div className="flex items-center justify-between mb-2">
										<div className="flex items-center gap-2 sm:gap-3">
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
			</div>

			<Modal
				show={isFullView}
				onClose={() => setIsFullView(false)}
				size="7xl"
				className="!h-screen"
			>
				<Modal.Body className="p-0 h-full">
					<div className="relative h-full">
						<button
							onClick={() => setIsFullView(false)}
							className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
						>
							<IoArrowBackCircle className="text-white" size={24} />
						</button>
						<Carousel className="h-full">
							{allImages.map((image, index) => (
								<div
									key={index}
									className="relative h-full flex items-center justify-center bg-black"
								>
									<Image
										src={image || logo}
										alt={`Resort image ${index + 1}`}
										className="object-contain max-h-[90vh]"
										width={1920}
										height={1080}
									/>
								</div>
							))}
						</Carousel>
					</div>
				</Modal.Body>
			</Modal>
		</section>
	);
};

export default ResortPage;
