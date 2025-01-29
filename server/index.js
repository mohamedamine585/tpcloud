const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json()); // To parse JSON requests

// Create connection to the database
const db = mysql.createPool({
    host: "database-1.cdzm6dea9knl.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "admin123",
    database: "Tpcloud"
});

// Function to create the 'games' table if it doesn't exist
const createTableIfNotExists = () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS games (
        idgames INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        cost DECIMAL(10, 2) NOT NULL,
        category VARCHAR(255) NOT NULL
    )`;

    db.query(createTableQuery, (err, result) => {
        if (err) {
            console.error("Error creating table:", err);
        } else {
            console.log("Games table checked/created successfully");
        }
    });
};

// Create the table if it doesn't exist
createTableIfNotExists();

// Route to fetch all games
server.get("/games", (req, res) => {
    let sql = "SELECT * FROM games";
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Route to edit a game
server.put("/edit", (req, res) => {
    const { id, name, cost, category } = req.body;

    let sql = "UPDATE games SET name = ?, cost = ?, category = ? WHERE idgames = ?";
    db.query(sql, [name, cost, category, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
server.post("/register", (req, res) => {
    const { name } = req.body;
    const { cost } = req.body;
    const { category } = req.body;

    let sql = "INSERT INTO games (name, cost, category) VALUES (?,?,?)"
    db.query(sql, [name, cost, category], (err,result) =>{
        if (err) {
            console.log(err);
        }else{
            console.log(result);
        }
    })
});
// Route to delete a game by its ID
server.delete("/delete/:index", (req, res) => {
    const { index } = req.params;

    let sql = "DELETE FROM games WHERE idgames = ?";
    db.query(sql, [index], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Start the Express server
server.listen(3001, () => console.log("Running on port 3001"));