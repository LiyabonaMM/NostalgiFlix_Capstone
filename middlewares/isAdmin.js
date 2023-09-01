const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

module.exports = async (req, res, next) => {
  try {
    // Check if the header exists before extracting the token
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1]

    if (!token) {
      throw "No token provided!"
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decodedToken.userId

    // Fetch user from the database using userId and check role
    const user = await User.findById(userId)
    if (!user.isAdmin) {
      throw "User does not have admin rights!"
    } else {
      next()
    }
  } catch (error) {
    console.error("Admin check error: ", error)
    res.status(401).json({ message: "Unauthorized request!" })
  }
}
