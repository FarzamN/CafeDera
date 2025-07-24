import { Router } from "express";
import {
  addInventory,
  getInventory,
  editInventory,
  deleteInventory,
} from "../controller/addInventory.controller.js";

const inventoryRoute = Router();

inventoryRoute.get("/getInventory", getInventory);
inventoryRoute.post("/addInventory", addInventory);
inventoryRoute.post("/editInventory/:id", editInventory);
inventoryRoute.post("/deleteInventory/:id", deleteInventory);
export default inventoryRoute;
