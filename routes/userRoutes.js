const express = require("express")
const userController = require("../controllers/userController")
const { check, validationResult } = require("express-validator")
const auth = require("../middlewares/authMiddleware")

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
    check("adminCode")
      .optional()
      .isString()
      .withMessage("Admin code should be a string"),
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

// Fetch all users
router.get("/all", userController.getAllUsers)

// Access private route
router.get("/private", auth, (req, res) => {
  res.json({ message: "This is a private route!" })
})

// View logged-in user profile
router.get("/profile", auth, userController.viewProfile)

// Edit logged-in user profile
router.put(
  "/profile/update/:userId",
  [
    // Here, you can add validation checks for the new data as needed
    check("firstName")
      .optional()
      .notEmpty()
      .withMessage("First name is required"),
    check("lastName")
      .optional()
      .notEmpty()
      .withMessage("Last name is required"),
    check("email").optional().isEmail().withMessage("Enter a valid email"),
    check("oldPassword")
      .optional()
      .exists()
      .withMessage("Current password is required if changing password"),
    check("newPassword")
      .optional()
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters long"),
  ],
  validate,
  userController.updateProfile
)

// Delete logged-in user's profile
router.delete("/profile/delete/:userId", auth, userController.deleteUser)
// Delete user by ID (Admin operation)
router.delete("/delete/:userId", auth, userController.deleteUserById)

module.exports = router
