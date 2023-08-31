const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  console.log("Auth middleware triggered") // Add this

  const token = req.header("Authorization").replace("Bearer ", "")
  console.log("Extracted token:", token) // Add this

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log("Decoded token:", decoded) // Add this
    req.user = decoded
    next()
  } catch (err) {
    console.error("Token verification error:", err) // Modified this
    res.status(401).json({ message: "Token is not valid" })
  }
}
