const jwt = require("jsonwebtoken")
const User = require("../models/userModel") // Assuming this is the correct path

module.exports = async (req, res, next) => {
  try {
    // Extract token and verify
    const token = req.headers.authorization.split(" ")[1]
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
