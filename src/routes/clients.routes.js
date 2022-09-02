import { Router } from "express";
const router = Router();

import * as clientsCtrl from "../controllers/clients.controller";
import { authJwt } from "../middlewares";


router.get("/", authJwt.verifyToken, clientsCtrl.getClients);

router.get("/:clientID", authJwt.verifyToken, clientsCtrl.getClientByID);

router.get("/getPhone/:clientPhone", authJwt.verifyToken, clientsCtrl.getClientByPhone);

router.post("/", [authJwt.verifyToken, authJwt.isAdmin], clientsCtrl.createClient);

router.put("/:clientID", [authJwt.verifyToken, authJwt.isAdmin], clientsCtrl.updateClientByID);

router.delete("/:clientID", [authJwt.verifyToken, authJwt.isAdmin], clientsCtrl.deleteClientByID);

export default router;