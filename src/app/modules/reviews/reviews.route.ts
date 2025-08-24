import express from "express";
import auth from "../../middlewares/auth";
import { User_Role } from "../users/user.constant";
import validationRequest from "../../middlewares/validationRequest";
import { ReviewValidation } from "./reviews.validation";
import { ReviewController } from "./reviews.controller";


const router = express.Router();

router.get("/", ReviewController.getAllReview);
router.get("/show", ReviewController.showAllReview);
router.get("/my-review", ReviewController.getMyReview);

router.post(
  "/create-review",
  auth(User_Role.USER, User_Role.ADMIN, User_Role.AUTHOR, User_Role.EDITOR),
  validationRequest(ReviewValidation.createReviewValidation),
  ReviewController.createReview
);
router.patch(
  "/update-review",
  auth(User_Role.ADMIN, User_Role.EDITOR, User_Role.USER),
  ReviewController.updateReview
);

router.patch(
  "/:id/update-review-status",
  auth(User_Role.ADMIN, User_Role.EDITOR, User_Role.SUPER_ADMIN),
  validationRequest(ReviewValidation.updateReviewStatusValidation),
  ReviewController.updateReviewStatus
);

router.delete(
  "/delete-review/:id",
  auth(User_Role.ADMIN, User_Role.SUPER_ADMIN, User_Role.EDITOR),
  ReviewController.deleteReview
);

export const ReviewRoutes = router;
