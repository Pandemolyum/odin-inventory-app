import Router from "express";
import { renderStores } from "../controllers/storesController.js";

const storesRouter = Router();

storesRouter.get("/", renderStores);

export default storesRouter;
