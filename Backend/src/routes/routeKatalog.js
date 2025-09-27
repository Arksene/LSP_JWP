import express from "express";
import { getKatalog, createKatalog, deleteKatalog, updateKatalog} from "../controller/katalogControllers.js";
import { authMiddleware } from "../middleware/middleware.js";

const router = express.Router();


router.get("/katalog",  getKatalog);
router.post("/addKatalog",authMiddleware, createKatalog);
router.delete("/deleteKatalog/:id", authMiddleware, deleteKatalog);
router.put("/updateKatalog/:id",authMiddleware, updateKatalog);


export default router;