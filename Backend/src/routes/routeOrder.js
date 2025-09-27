import express from "express";
import { getOrders, updateOrder , createOrder} from "../controller/orderControllers.js";
import { authMiddleware } from "../middleware/middleware.js";

const router = express.Router();

router.get("/orders", authMiddleware, getOrders);
router.post("/orders", createOrder);
router.put("/orders/:id",authMiddleware, updateOrder);


export default router;