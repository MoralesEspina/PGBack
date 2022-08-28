import { Router } from "express";
const router = Router();

import * as productsCtrl from "../controllers/products.controller";
import { authJwt } from "../middlewares";


router.get("/",authJwt.verifyToken, productsCtrl.getProducts);

router.get("/:productID",authJwt.verifyToken, productsCtrl.getProductByID);

router.post("/", [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.createProduct);

router.put("/:productID", [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.updateProductByID);

router.delete("/:productID", [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.deleteProductByID);

export default router;
