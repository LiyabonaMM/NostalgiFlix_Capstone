const express = require("express")
const userController = require("../controllers/userController")
const { check } = require("express-validator")
const router = express.Router()

router.post(
  "/register",
  [
    check("email").isEmail().withMessage("Enter a valid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.register
)

router.get("/", userController.getAllUsers) // This is just for testing and should be removed in production!

module.exports = router
