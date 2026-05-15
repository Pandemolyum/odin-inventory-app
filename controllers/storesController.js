import { getAllStores } from "../db/queries.js";

async function renderStores(req, res) {
    const stores = await getAllStores();

    res.render("stores.ejs", { stores: stores });
}

export { renderStores };
