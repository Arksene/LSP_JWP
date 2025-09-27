import express from "express";
import { getProfil, updateProfil } from "../controller/profilControllers.js";
import { authMiddleware } from "../middleware/middleware.js";

const router = express.Router();

router.get("/profil",authMiddleware, getProfil)
router.put("/profil/:id",authMiddleware, updateProfil)

export default router;