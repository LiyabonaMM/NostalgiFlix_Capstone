require("dotenv").config()

const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.send("Hello, World!")
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})
const userRoutes = require("./routes/userRoutes")
const movieRoutes = require("./routes/movieRoutes")

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// API Endpoints
app.use("/api/users", userRoutes)
app.use("/api/movies", movieRoutes)
