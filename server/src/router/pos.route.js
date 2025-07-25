import { Router } from "express";
import { getInventoryWithDate, getItemWithDate } from "../controller/pos.controller.js";

const posRoute = Router();

posRoute.post("/getItemWithDate", getItemWithDate);
posRoute.post("/getInventoryWithDate", getInventoryWithDate);

export default posRoute;
