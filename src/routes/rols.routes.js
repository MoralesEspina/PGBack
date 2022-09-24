import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/user.controller";
import { authJwt, verifySignup } from "../middlewares";

router.get("/", [authJwt.verifyToken], usersCtrl.getRols);

router.put("/:userID", [authJwt.verifyToken], usersCtrl.editUser);

router.delete("/:userID", [authJwt.verifyToken], usersCtrl.deleteUser);
export default router;
