require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Define the API endpoint to fetch all products
app.get("/api/products", async (req, res) => {
  try {
    // Query the products table
    const { rows } = await pool.query("SELECT * FROM products");

    // Send the products as the response
    res.json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    // Query the categories table
    const { rows } = await pool.query("SELECT * FROM categories");

    // Extract the name from each row
    // const categories = rows.map((row) => row.name);

    // Send the categories as the response
    // res.json(categories);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
