import { Router } from "express";
import { addOrder, getOrder } from "../controller/order.controller.js";

const orderRoute = Router();

orderRoute.get("/getOrder", getOrder);
orderRoute.post("/addOrder", addOrder);

export default orderRoute; 
