const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

// Get all candidates and their party affiliation
router.get("/employee", (req, res) => {
  const sql = `SELECT employee.*, role.title 
                AS role_title 
                FROM employee 
                LEFT JOIN role 
                ON employee.role_id = role.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

module.exports = router;
