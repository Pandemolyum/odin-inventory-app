import config from "../config.js";
import { Pool } from "pg";

export default new Pool({
    connectionString: process.env.DB_URL,
});
