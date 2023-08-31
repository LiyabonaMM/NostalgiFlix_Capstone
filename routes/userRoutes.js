const express = require("express")
const userController = require("../controllers/userController")
const { check, validationResult } = require("express-validator")
const auth = require("../middlewares/authMiddleware") // Importing the authentication middleware
const router = express.Router()

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  next()
}

router.post(
  "/register",
  [
    check("firstName").notEmpty().withMessage("First name is required"),
    check("lastName").notEmpty().withMessage("Last name is required"),
    check("email").isEmail().withMessage("Enter a valid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  validate,
  userController.register
)

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Enter a valid email"),
    check("password").exists().withMessage("Password is required"),
  ],
  validate,
  userController.login
)

router.get("/all", userController.getAllUsers) // This is just for testing and should be removed in production!

// Adding a protected route to fetch private data
router.get("/private", auth, (req, res) => {
  res.json({ message: "This is a private route!" })
})

// Adding the route to edit user profile
router.put("/editProfile", auth, userController.editProfile)
router.delete("/delete", auth, userController.deleteUser)

module.exports = router
