const pool = require("../config/config")

const Movie = {
  async createMovie(title, imageUrl, price) {
    const [result] = await pool.execute(
      "INSERT INTO Movies (title, imageUrl, price) VALUES (?, ?, ?)",
      [title, imageUrl, price]
    )
    return result.insertId
  },

  async getAllMovies() {
    const [movies] = await pool.query("SELECT * FROM Movies")
    return movies
  },

  // Add any other required functions for the Movie model here...
}

module.exports = Movie
