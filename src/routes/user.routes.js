import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/user.controller";
import { authJwt, verifySignup } from "../middlewares";

router.post("/", [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkDuplicateUsername, verifySignup.checkRolesExisted], usersCtrl.createUser);

router.get("/:userID", [authJwt.verifyToken], usersCtrl.getUser);

router.get("/", [authJwt.verifyToken], usersCtrl.getUsers);

router.get("/", [authJwt.verifyToken], usersCtrl.getRols);

export default router;
