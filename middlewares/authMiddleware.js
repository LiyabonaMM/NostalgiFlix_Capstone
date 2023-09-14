const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  console.log("Auth middleware triggered")

  // Extract token from Authorization header
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1]

  if (!token) {
    console.log("No token found in the request headers.")
    return res.status(401).json({ message: "No token, authorization denied" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Log the decoded JWT payload for debugging
    console.log("Decoded token:", decoded)

    req.user = decoded
    next()
  } catch (err) {
    console.error("Token verification error:", err)
    res.status(401).json({ message: "Token is not valid" })
  }
}
