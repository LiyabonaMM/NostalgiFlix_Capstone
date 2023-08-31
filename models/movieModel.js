// models/movieModel.js
const pool = require("../config/config")

const Movie = {
  async findAll() {
    return await pool.query("SELECT * FROM Movies")
  },

  async findById(id) {
    return await pool.query("SELECT * FROM Movies WHERE id = ?", [id])
  },

  async create(movieData) {
    const { title, description, releaseDate, rating, imageUrl, price } =
      movieData
    return await pool.execute(
      "INSERT INTO Movies (title, description, releaseDate, rating, imageUrl, price) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, releaseDate, rating, imageUrl, price]
    )
  },

  async update(id, movieData) {
    const { title, description, releaseDate, rating, imageUrl, price } =
      movieData
    return await pool.execute(
      "UPDATE Movies SET title = ?, description = ?, releaseDate = ?, rating = ?, imageUrl = ?, price = ? WHERE id = ?",
      [title, description, releaseDate, rating, imageUrl, price, id]
    )
  },

  async delete(id) {
    return await pool.execute("DELETE FROM Movies WHERE id = ?", [id])
  },
}

module.exports = Movie
