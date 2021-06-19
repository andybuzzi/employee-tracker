const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  // Your MySQL username,
  user: "root",
  // Your MySQL password
  password: "AbdR1993!SbJv2021!",
  database: "tracker",
});

module.exports = db;
