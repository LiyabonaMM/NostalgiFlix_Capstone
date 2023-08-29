const { User } = require("../models")

const userController = {
  // Register a new user
  async register(req, res) {
    try {
      const user = await User.create(req.body)
      return res.status(201).json(user)
    } catch (error) {
      return res.status(500).json({ message: "Error registering user." })
    }
  },

  // Fetch all users (for testing purposes only)
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll()
      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json({ message: "Error fetching users." })
    }
  },
}

module.exports = userController
