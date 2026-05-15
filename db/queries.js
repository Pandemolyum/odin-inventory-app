import pool from "./pool.js";

async function getAllStores() {
    try {
        const { rows } = await pool.query("SELECT * FROM stores");
        return rows;
    } catch (err) {
        console.error("The Stores table cannot be accessed.", err);
        return;
    }
}

export { getAllStores };
