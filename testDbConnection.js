// testDbConnection.js
require("dotenv").config()
const pool = require("./config/config") // This correctly points to the config.js inside the config directory.

pool
  .query("SELECT 1 + 1 AS result")
  .then((result) => {
    console.log("Connection has been established successfully.")
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error)
  })
