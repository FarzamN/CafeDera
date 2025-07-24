import cors from "cors";
import express from "express";
import { config } from "dotenv";
import { DBConnection } from "./src/utils/index.js";

import itemRoute from "./src/router/items.route.js";
import inventoryRoute from "./src/router/inventory.route.js";
import orderRoute from "./src/router/order.route.js";

config();
DBConnection();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("CafeDera Backend Running");
});

app.use("/api", itemRoute);
app.use("/api", inventoryRoute);
app.use("/api", orderRoute);

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
