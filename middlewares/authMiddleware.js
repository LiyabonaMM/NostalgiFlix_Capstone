const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  console.log("Auth middleware triggered")

  // Updated token extraction method
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log("Decoded token:", decoded)
    req.user = decoded
    next()
  } catch (err) {
    console.error("Token verification error:", err)
    res.status(401).json({ message: "Token is not valid" })
  }
}
