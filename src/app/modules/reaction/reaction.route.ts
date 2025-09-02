import express from "express";

import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validationRequest";
import { reactionController } from "./reaction.controller";
import { User_Role } from "../users/user.constant";
import { reactionValidation } from "./reaction.validation";

const router = express.Router();

router.get("/:postId", reactionController.getReactionsByPostId);

router.post(
  "/create-react",
  auth(
    User_Role.USER,
    User_Role.AUTHOR,
    User_Role.SUPER_ADMIN,
    User_Role.ADMIN,
    User_Role.EDITOR
  ),
  validateRequest(reactionValidation.reactionValidationSchema),
  reactionController.createReaction
);

router.delete(
  "/:postId",
  auth(
    User_Role.USER,
    User_Role.AUTHOR,
    User_Role.SUPER_ADMIN,
    User_Role.ADMIN,
    User_Role.EDITOR
  ),
  reactionController.deleteReaction
);

export const ReactionRoutes = router;
