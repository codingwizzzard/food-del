import express from "express";
import authMiddleware from "../middleware/auth.js";
import { listOrders, placeOrder, updateStatus, usersOrder, verifyOrder } from "../controllers/order.controller.js";

const orderRouter = express.Router()

orderRouter.post("/place", authMiddleware, placeOrder)
orderRouter.post("/verify", verifyOrder)
orderRouter.post("/userorders", authMiddleware, usersOrder)
orderRouter.get("/list", listOrders)
orderRouter.post("/status", updateStatus)

export default orderRouter