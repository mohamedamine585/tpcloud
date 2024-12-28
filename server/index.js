require('dotenv').config();
const express = require('express');
const server = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host: process.env.DBURL,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database:process.env.DBNAME,
    port: process.env.PORT
});

server.use(express.json());
server.use(cors());

server.post("/api/register", (req, res) => {
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

server.get("/api/games", (req, res) => {

    let sql = "SELECT * FROM games";
    db.query(sql, (err,result) =>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }

    })
});

server.put("/api/edit", (req, res) => {
    const { id } = req.body;
    const { name } = req.body;
    const { cost } = req.body;
    const { category } = req.body;

    let sql = "UPDATE games SET name = ?, cost = ?, category = ? WHERE idgames = ?";
    db.query(sql, [name, cost, category, id], (err,result) =>{
        if (err) {
            console.log(err);
        }else{

            res.send(result);
        }
    })
});

server.delete("/api/delete/:index", (req,res) =>{
    const { index } = req.params

    let sql = "DELETE FROM games WHERE idgames = ?"
    db.query(sql, [index], (err,result) =>{err ? console.log(err) : res.send(result)})
})
server.listen(3001,'0.0.0.0', () =>
    console.log("Running in the port 3001")
);
