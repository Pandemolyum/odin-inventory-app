#! /usr/bin/env node

import config from "../config.js";
import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS Products (
  product_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_name VARCHAR ( 255 ) NOT NULL,
  product_brand VARCHAR ( 127 ),
  category VARCHAR ( 127 ),
  quantity DECIMAL ( 10, 2 ),
  unit_type VARCHAR ( 20 ),
  description TEXT
);

CREATE TABLE IF NOT EXISTS Stores (
  store_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  store_name VARCHAR ( 255 ) NOT NULL,
  store_brand VARCHAR ( 127 ),
  address VARCHAR ( 255 ),
  city VARCHAR ( 100 ),
  country VARCHAR ( 100 )
);
  
CREATE TABLE IF NOT EXISTS PriceHistory (
  price_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_id INT REFERENCES Products(product_id),
  store_id INT REFERENCES Stores(store_id),
  price DECIMAL ( 10, 2 ) NOT NULL,
  valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  valid_to TIMESTAMP
);

CREATE TABLE Recipes (
    recipe_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    recipe_name VARCHAR( 255 ) NOT NULL,
    instructions TEXT
);

CREATE TABLE RecipeIngredients (
    recipe_id INT REFERENCES Recipes(recipe_id),
    product_id INT REFERENCES Products(product_id),
    quantity DECIMAL( 10, 2 ) NOT NULL,
    PRIMARY KEY ( recipe_id, product_id )
);

INSERT INTO Products (product_name, product_brand, category) 
VALUES
  ('Premium banana', 'Chiquita', 'Fruits and Vegetables'),
  ('Crunchy Peanut Butter 1kg', 'Kraft', 'Spreads and Condiments'),
  ('One-dozen egg carton, free run chicken', 'Burnbae', 'Dairy');

INSERT INTO Stores (store_name, store_brand, city, country) 
VALUES
  ('Super C - Jarry', 'Super C', 'Montreal', 'Canada'),
  ('Maxi - Jean-Talon', 'Maxi', 'Montreal', 'Canada'),
  ('IGA - St-Zotique', 'IGA', 'Montreal', 'Canada');
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: config.DB_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();
