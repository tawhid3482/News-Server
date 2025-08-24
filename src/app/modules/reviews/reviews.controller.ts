// Review.controller.ts
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReviewService } from "./reviews.service";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const { userEmail } = req.user;
  const result = await ReviewService.createReviewIntoDB(req, userEmail);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review created successfully!",
    data: result,
  });
});

const getAllReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getAllReviewFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review retrieved successfully!",
    data: result,
  });
});
const showAllReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.showAllReviewFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review retrieved successfully!",
    data: result,
  });
});

const getMyReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const result = await ReviewService.getMyReviewFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review retrieved successfully!",
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const result = await ReviewService.updateReviewIntoDB(req, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review updated successfully!",
    data: result,
  });
});

// controller
const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewService.deleteReviewFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review deleted successfully!",
    data: result,
  });
});

const updateReviewStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.user;
  const result = await ReviewService.updateReviewStatusIntoDB(req, userId, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review status updated successfully!",
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getAllReview,
  updateReview,
  getMyReview,
  deleteReview,
  updateReviewStatus,
  showAllReview
};
