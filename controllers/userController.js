const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const pool = require("../config/config")

const ADMIN_CODE = "liyaAdmin123" // You can set this to a secure code.

const userController = {
  async register(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const { firstName, lastName, email, adminCode } = req.body
      const isAdmin = adminCode === ADMIN_CODE

      const [result] = await pool.execute(
        "INSERT INTO Users (firstName, lastName, email, password, isAdmin) VALUES (?, ?, ?, ?, ?)",
        [firstName, lastName, email, hashedPassword, isAdmin]
      )

      const token = jwt.sign(
        { userId: result.insertId },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      )

      return res.status(201).json({
        user: {
          id: result.insertId,
          firstName,
          lastName,
          email,
          isAdmin,
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
          isAdmin: user.isAdmin,
        },
        token,
      })
    } catch (error) {
      console.error("Error detail:", error)
      return res.status(500).json({ message: "Error logging in user." })
    }
  },

  async editProfile(req, res) {
    try {
      const userId = req.params.userId
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
      const userIdFromToken = Number(req.user.userId)
      const userIdToDelete = Number(req.params.userId)

      // Check if the user is trying to delete their own profile
      if (userIdFromToken === userIdToDelete) {
        return res.status(403).json({ message: "Success" })
      }

      await pool.execute("DELETE FROM Users WHERE id = ?", [userIdToDelete])
      res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
      console.error("Error detail:", error)
      res.status(500).json({ message: "Error deleting user." })
    }
  },
  async deleteUserById(req, res) {
    try {
      const loggedUser = req.user.userId // the ID of the user who is attempting the delete
      const targetUserId = req.params.userId // the ID of the user that should be deleted

      // Fetch the logged in user's details to check if they're an admin
      const [users] = await pool.execute("SELECT * FROM Users WHERE id = ?", [
        loggedUser,
      ])
      const loggedInUser = users[0]

      if (!loggedInUser || !loggedInUser.isAdmin) {
        return res.status(403).json({ message: "Unauthorized." })
      }

      // Now, delete the target user
      await pool.execute("DELETE FROM Users WHERE id = ?", [targetUserId])
      res
        .status(200)
        .json({ message: `User ${targetUserId} deleted successfully` })
    } catch (error) {
      console.error("Error detail:", error)
      res.status(500).json({ message: "Error deleting user." })
    }
  },
  async viewProfile(req, res) {
    try {
      const userId = req.user.userId
      const [users] = await pool.execute("SELECT * FROM Users WHERE id = ?", [
        userId,
      ])
      const user = users[0]

      if (!user) {
        return res.status(404).json({ message: "User not found." })
      }

      // Remove sensitive info before sending response
      delete user.password

      return res.status(200).json(user)
    } catch (error) {
      console.error("Error detail:", error)
      return res.status(500).json({ message: "Error fetching profile." })
    }
  },

  async updateProfile(req, res) {
    try {
      const userId = req.params.userId
      const { firstName, lastName, email, oldPassword, newPassword } = req.body

      const [users] = await pool.execute("SELECT * FROM Users WHERE id = ?", [
        userId,
      ])
      const user = users[0]

      if (!user) {
        return res.status(404).json({ message: "User not found." })
      }

      // If user wants to change the password
      if (oldPassword && newPassword) {
        const isMatch = await bcrypt.compare(oldPassword, user.password)

        if (!isMatch) {
          return res
            .status(400)
            .json({ message: "Current password is incorrect." })
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10)

        await pool.execute(
          "UPDATE Users SET firstName = ?, lastName = ?, email = ?, password = ? WHERE id = ?",
          [firstName, lastName, email, hashedNewPassword, userId]
        )
      } else {
        await pool.execute(
          "UPDATE Users SET firstName = ?, lastName = ?, email = ? WHERE id = ?",
          [firstName, lastName, email, userId]
        )
      }

      res.status(200).json({ message: "Profile updated successfully." })
    } catch (error) {
      console.error("Error detail:", error)
      res.status(500).json({ message: "Error updating profile." })
    }
  },
}

module.exports = userController
