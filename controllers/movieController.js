// controllers/movieController.js

const Movie = require("../models/movieModel")

const movieController = {
  async getAllMovies(req, res) {
    try {
      const movies = await Movie.findAll()
      return res.status(200).json(movies)
    } catch (error) {
      console.error("Error fetching movies:", error)
      return res.status(500).json({ message: "Error fetching movies." })
    }
  },

  async getMovieById(req, res) {
    try {
      const movie = await Movie.findById(req.params.id)
      if (!movie) {
        return res.status(404).json({ message: "Movie not found." })
      }
      return res.status(200).json(movie)
    } catch (error) {
      console.error("Error fetching movie by ID:", error)
      return res.status(500).json({ message: "Error fetching movie." })
    }
  },

  async createMovie(req, res) {
    try {
      const [result] = await Movie.create(req.body) // Destructure the returned array to get the result

      if (result && result.insertId) {
        return res.status(201).json({
          message: "Movie created successfully!",
          movieId: result.insertId,
        })
      } else {
        return res.status(400).json({ message: "Movie creation failed!" })
      }
    } catch (error) {
      console.error("Error creating movie:", error)
      return res.status(500).json({ message: "Error creating movie." })
    }
  },
  async updateMovie(req, res) {
    try {
      const updatedMovie = await Movie.update(req.params.id, req.body)
      if (updatedMovie.affectedRows === 0) {
        return res.status(404).json({ message: "Movie not found." })
      }
      return res.status(200).json({ message: "Movie updated successfully." })
    } catch (error) {
      console.error("Error updating movie:", error)
      return res.status(500).json({ message: "Error updating movie." })
    }
  },

  async deleteMovie(req, res) {
    try {
      const result = await Movie.delete(req.params.id)
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Movie not found." })
      }
      return res.status(200).json({ message: "Movie deleted successfully." })
    } catch (error) {
      console.error("Error deleting movie:", error)
      return res.status(500).json({ message: "Error deleting movie." })
    }
  },
}

module.exports = movieController
