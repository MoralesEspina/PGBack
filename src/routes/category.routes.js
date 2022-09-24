import { Router } from "express";
const router = Router();

import * as categoryCtrl from "../controllers/category.controller";
import { authJwt, verifySignup } from "../middlewares";

router.get("/",[authJwt.verifyToken],categoryCtrl.getCategories);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],categoryCtrl.createCategory
);

export default router;
