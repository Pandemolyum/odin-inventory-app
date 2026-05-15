import express from "express";
import path from "node:path";
import indexRouter from "./routes/indexRouter.js";
import storesRouter from "./routes/storesRouter.js";
import config from "./config.js";
global.config = config;

import { fileURLToPath } from "node:url";
import { dirname } from "path";

// Creates the express application
const app = express();

// Assign project paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set assets path (styles)
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Set views engine
app.set("views", path.join(__dirname, "views"));
app.set("view_engine", "ejs");

// Parses requests that contain URL-encoded data and
// converts them to a JavaScript object accessible via "req.body"
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", indexRouter);
app.use("/stores", storesRouter);

// Listen for requests
app.listen(config.PORT_NODE, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Express app listening on port ${config.PORT_NODE}...`);
});
