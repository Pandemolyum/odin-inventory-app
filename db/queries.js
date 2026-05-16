import pool from "./pool.js";

async function getAllStores() {
    try {
        const { rows } = await pool.query("SELECT * FROM stores");
        return rows;
    } catch (err) {
        console.error("Could not read stores database.", err);
        return;
    }
}

async function getStoreByID(id) {
    try {
        const { rows } = await pool.query(
            "SELECT * FROM stores WHERE store_id = $1",
            [id],
        );
        return rows[0];
    } catch (err) {
        console.error("Could not read stores database.", err);
        return;
    }
}

async function insertStore(store_name, store_brand, address, city, country) {
    try {
        await pool.query(
            "INSERT INTO stores (store_name, store_brand, address, city, country) VALUES ($1, $2, $3, $4, $5)",
            [store_name, store_brand, address, city, country],
        );
    } catch (err) {
        console.error("Could not update stores database.", err);
        return;
    }
}

async function updateStore(
    store_name,
    store_brand,
    address,
    city,
    country,
    store_id,
) {
    try {
        await pool.query(
            "UPDATE stores SET store_name = $1, store_brand = $2, address = $3, city = $4, country = $5 WHERE store_id = $6",
            [store_name, store_brand, address, city, country, store_id],
        );
    } catch (err) {
        console.error("Could not update stores database.", err);
        return;
    }
}

async function deleteStore(store_id) {
    await pool.query("DELETE FROM stores WHERE store_id = $1", [store_id]);
}

export { getAllStores, getStoreByID, insertStore, updateStore, deleteStore };
