import express from "express";
import auth from "../../middlewares/auth";
import { User_Role } from "../users/user.constant";
import validationRequest from "../../middlewares/validationRequest";
import { OpinionValidation } from "./opinion.validation";
import { OpinionController } from "./opinion.controller";

const router = express.Router();

// ✅ Public
router.get("/", OpinionController.getAllOpinion);
router.get("/all-opinion", OpinionController.getAllOpinionForSuperUser);
router.get(
  "/my-opinions",
  auth(User_Role.ADMIN, User_Role.AUTHOR, User_Role.SUPER_ADMIN),
  OpinionController.getAllMyOpinions
);

// ✅ Create (Author / Editor)
router.post(
  "/create-opinion",
  auth(User_Role.AUTHOR, User_Role.EDITOR),
  validationRequest(OpinionValidation.createOpinion),
  OpinionController.createOpinion
);


router.get("/:slug", OpinionController.getSingleOpinion);
router.get("/:id", OpinionController.getSingleMyOpinion);



export const OpinionRoutes = router;
