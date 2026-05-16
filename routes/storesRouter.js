import Router from "express";
import {
    renderStores,
    getNewStoreForm,
    createStore,
    getStoreForm,
    editStore,
    removeStore,
} from "../controllers/storesController.js";

const storesRouter = Router();

storesRouter.get("/", renderStores);
storesRouter.get("/new", getNewStoreForm);
storesRouter.post("/new", createStore);
storesRouter.get("/edit/:id", getStoreForm);
storesRouter.post("/edit/:id", editStore);
storesRouter.post("/delete/:id", removeStore);

export default storesRouter;
