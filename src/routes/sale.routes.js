import { Router } from "express";
const router = Router();

import * as saleCtrl from "../controllers/sale.controller";
import { authJwt } from "../middlewares";

router.post("/", [authJwt.verifyToken], saleCtrl.createSale);

router.get("/:salesID", [authJwt.verifyToken], saleCtrl.getSale);

router.get("/", [authJwt.verifyToken], saleCtrl.getSales);

router.get("/detailSale/:saleID", [authJwt.verifyToken], saleCtrl.detailSale);

export default router;