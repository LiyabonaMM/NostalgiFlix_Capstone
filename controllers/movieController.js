const { Movie } = require("../models")

const movieController = {
  // Create a new movie
  async createMovie(req, res) {
    try {
      const movie = await Movie.create(req.body)
      return res.status(201).json(movie)
    } catch (error) {
      return res.status(500).json({ message: "Error adding movie." })
    }
  },

  // Fetch all movies
  async getAllMovies(req, res) {
    try {
      const movies = await Movie.findAll()
      return res.status(200).json(movies)
    } catch (error) {
      return res.status(500).json({ message: "Error fetching movies." })
    }
  },
}

module.exports = movieController
