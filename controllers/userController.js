// controllers/userController.js
const pool = require("../config/config")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userController = {
  async register(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const { firstName, lastName, email } = req.body

      const [result] = await pool.execute(
        "INSERT INTO Users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
        [firstName, lastName, email, hashedPassword]
      )

      const token = jwt.sign(
        { userId: result.insertId },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      )

      return res.status(201).json({
        user: {
          id: result.insertId,
          firstName,
          lastName,
          email,
        },
        token,
      })
    } catch (error) {
      return res.status(500).json({ message: "Error registering user." })
    }
  },

  async getAllUsers(req, res) {
    try {
      const [users] = await pool.query("SELECT * FROM Users")
      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json({ message: "Error fetching users." })
    }
  },
}

module.exports = userController
