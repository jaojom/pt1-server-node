const express = require('express');
// const mysql = require('mysql2/promise');
const pool = require('./db');
require('dotenv').config();
const app = express();
const PORT = 5000;
app.use(express.json());


// GET /users
app.get('/books', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM `books`');
    res.json(rows);
  } catch (err) {
    console.log("Query error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.post('/books', async (req, res) => {
  try {
    let { title, price } = req.body;
    const [result] = await pool.query('INSERT INTO `books` (title, price) VALUES (?, ?)', [title, price]);
    res.json({ message: `${title} insert sucessfully` });
  } catch (err) {
    console.log("Insert error:", err);
    res.status(500).json({ error: "Failed to add book" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});