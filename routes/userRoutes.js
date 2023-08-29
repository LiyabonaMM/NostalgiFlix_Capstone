const express = require("express")
const userController = require("../controllers/userController")
const router = express.Router()

router.post("/register", userController.register)
router.get("/", userController.getAllUsers) // This is just for testing and should be removed in production!

module.exports = router
