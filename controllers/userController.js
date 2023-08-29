const { User } = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userController = {
  async register(req, res) {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10) // 10 is the number of salt rounds

      // Create a user with the hashed password
      const user = await User.create({
        ...req.body,
        password: hashedPassword,
      })

      // Generate JWT token using secret from environment variables
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      })

      // Respond with user data (without password) and the token
      return res.status(201).json({
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        token,
      })
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
