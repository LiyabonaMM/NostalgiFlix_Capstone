const express = require("express")
const movieController = require("../controllers/movieController")
const isAdmin = require("../middlewares/isAdmin") // Middleware to check if user is admin

const router = express.Router()

router.get("/movies", movieController.getAllMovies)
router.get("/movie/:id", movieController.getMovieById)
router.post("/movie", isAdmin, movieController.createMovie) // Only admin can create
router.put("/movie/:id", isAdmin, movieController.updateMovie) // Only admin can update
router.delete("/movie/:id", isAdmin, movieController.deleteMovie) // Only admin can delete

module.exports = router
