// server.js
require("dotenv").config()

const express = require("express")
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const userRoutes = require("./routes/userRoutes")
const movieRoutes = require("./routes/movieRoutes")

// API Endpoints
app.use("/api/users", userRoutes)
app.use("/api/movies", movieRoutes)

app.get("/", (req, res) => {
  res.send("Hello, World!")
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})
