import { Router } from "express";
const router = Router();

import * as typesCtrl from "../controllers/type.controller";
import { authJwt } from "../middlewares";


router.get("/",authJwt.verifyToken, typesCtrl.getTypes);

router.get("/:typeID",authJwt.verifyToken, typesCtrl.getTypeByID);

router.post("/", [authJwt.verifyToken, authJwt.isAdmin], typesCtrl.createType);

router.put("/:typeID", [authJwt.verifyToken, authJwt.isAdmin], typesCtrl.updateTypeByID);

router.delete("/:typeID", [authJwt.verifyToken, authJwt.isAdmin], typesCtrl.deleteTypeByID);

export default router;