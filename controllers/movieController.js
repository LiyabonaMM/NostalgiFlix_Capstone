// controllers/movieController.js
const pool = require("../config/config")

const movieController = {
  async createMovie(req, res) {
    try {
      const { title, imageUrl, price } = req.body
      const [result] = await pool.execute(
        "INSERT INTO Movies (title, imageUrl, price) VALUES (?, ?, ?)",
        [title, imageUrl, price]
      )

      return res.status(201).json({ movieId: result.insertId })
    } catch (error) {
      return res.status(500).json({ message: "Error adding movie." })
    }
  },

  async getAllMovies(req, res) {
    try {
      const [movies] = await pool.query("SELECT * FROM Movies")
      return res.status(200).json(movies)
    } catch (error) {
      return res.status(500).json({ message: "Error fetching movies." })
    }
  },
}

module.exports = movieController
