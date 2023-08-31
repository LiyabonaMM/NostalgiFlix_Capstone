const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const pool = require("../config/config")

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
      if (error.code === "ER_DUP_ENTRY") {
        return res
          .status(400)
          .json({ message: "This email is already registered." })
      }
      console.error("Error detail:", error)
      return res.status(500).json({ message: "Error registering user." })
    }
  },

  async getAllUsers(req, res) {
    try {
      const [users] = await pool.query("SELECT * FROM Users")
      return res.status(200).json(users)
    } catch (error) {
      console.error("Error detail:", error)
      return res.status(500).json({ message: "Error fetching users." })
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body

      const [users] = await pool.execute(
        "SELECT * FROM Users WHERE email = ?",
        [email]
      )
      const user = users[0]

      if (!user) {
        return res.status(400).json({ message: "Invalid email or password." })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password." })
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      })

      return res.json({
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        token,
      })
    } catch (error) {
      return res.status(500).json({ message: "Error logging in user." })
    }
  },

  async editProfile(req, res) {
    try {
      console.log("Request User Object:", req.user) // Log the req.user object

      const userId = req.user.userId
      const { firstName, lastName } = req.body

      await pool.execute(
        "UPDATE Users SET firstName = ?, lastName = ? WHERE id = ?",
        [firstName, lastName, userId]
      )

      res.status(200).json({ message: "Profile updated successfully" })
    } catch (error) {
      console.error("Error detail:", error)
      if (error.message.includes("Cannot read properties of undefined")) {
        return res.status(400).json({
          message: "User authentication failed. Ensure your token is correct.",
        })
      }
      res.status(500).json({ message: "Error updating profile." })
    }
  },
  async deleteUser(req, res) {
    try {
      const userId = req.user.userId

      await pool.execute("DELETE FROM Users WHERE id = ?", [userId])

      res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
      console.error("Error detail:", error)
      res.status(500).json({ message: "Error deleting user." })
    }
  },
}

module.exports = userController
