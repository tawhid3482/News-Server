// review.service.ts
import { Request } from "express";
import { Review } from "./reviews.model";
import { User } from "../users/user.model";


// Create Review
const createReviewIntoDB = async (req: Request, userEmail: string) => {
  const { content, rating, isAnonymous = false } = req.body;
  const findUser = await User.findOne({ email: userEmail });
  const id = findUser ? findUser._id : null;

  const review = await Review.create({
    content,
    rating,
    isAnonymous,
    reviewer: isAnonymous ? null : id,
  });

  return review;
};

// Get All Reviews (admin side)
const getAllReviewFromDB = async () => {
  const reviews = await Review.find({ isDeleted: false }).populate("reviewer");
  return reviews;
};

// Show Only Approved Reviews (public side)
const showAllReviewFromDB = async () => {
  const reviews = await Review.find({
    isDeleted: false,
    isApproved: true,
  })
    .sort({ createdAt: -1 }) // latest first
    .limit(10)
    .populate("reviewer");

  return reviews;
};

// Get My Reviews
const getMyReviewFromDB = async (userId: string) => {
  const reviews = await Review.find({
    reviewer: userId,
    isDeleted: false,
  }).populate("reviewer");

  return reviews;
};

// Update My Review
const updateReviewIntoDB = async (req: Request, userId: string) => {
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw new Error("User does not exist!");
  }

  const { id, content, rating, isAnonymous } = req.body;

  const updatedReview = await Review.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { content, rating, isAnonymous },
    { new: true }
  );

  return updatedReview;
};

// Delete Review (soft delete)
const deleteReviewFromDB = async (id: string) => {
  const deleted = await Review.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return deleted;
};

// Update Review Status (Admin)
const updateReviewStatusIntoDB = async (
  req: Request,
  userId: string,
  id: string
) => {
  const { isApproved, isDeleted } = req.body;

  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw new Error("User does not exist!");
  }

  const existingReview = await Review.findById(id);
  if (!existingReview) {
    throw new Error("Review does not exist!");
  }

  const updatedReview = await Review.findByIdAndUpdate(
    id,
    {
      isApproved:
        typeof isApproved === "boolean"
          ? isApproved
          : existingReview.isApproved,
      isDeleted:
        typeof isDeleted === "boolean"
          ? isDeleted
          : existingReview.isDeleted,
    },
    { new: true }
  );

  return updatedReview;
};

export const ReviewService = {
  createReviewIntoDB,
  getAllReviewFromDB,
  showAllReviewFromDB,
  getMyReviewFromDB,
  updateReviewIntoDB,
  deleteReviewFromDB,
  updateReviewStatusIntoDB,
};
