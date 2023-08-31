const pool = require("../config/config")

const User = {
  // Create a new user
  async createUser(firstName, lastName, email, password, isAdmin = false) {
    const [result] = await pool.execute(
      "INSERT INTO Users (firstName, lastName, email, password, isAdmin) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, email, password, isAdmin]
    )
    return result.insertId
  },

  // Get all users
  async getAllUsers() {
    const [users] = await pool.query("SELECT * FROM Users")
    return users
  },

  // Find user by ID
  async findById(userId) {
    const [users] = await pool.query("SELECT * FROM Users WHERE id = ?", [
      userId,
    ])
    return users[0] // return the first user since ID is unique
  },

  // Add other methods/functions related to user operations as needed...
  // e.g., updateUser, deleteUser, etc.
}

module.exports = User
