import { Router } from "express";
import {
  addItem,
  getItems,
  deleteItem,
  editItem,
} from "../controller/addItem.controller.js";

const itemRoute = Router();

itemRoute.get("/getItems", getItems);
itemRoute.post("/addItems", addItem);
itemRoute.post("/editItem/:id", editItem);
itemRoute.post("/deleteItem/:id", deleteItem);
export default itemRoute;
