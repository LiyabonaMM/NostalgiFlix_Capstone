// models/user.js

const pool = require("../config/config")

const User = {
  async createUser(firstName, lastName, email, password) {
    const [result] = await pool.execute(
      "INSERT INTO Users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, password]
    )
    return result.insertId
  },

  async getAllUsers() {
    const [users] = await pool.query("SELECT * FROM Users")
    return users
  },
  // ... more functions
}

module.exports = User
