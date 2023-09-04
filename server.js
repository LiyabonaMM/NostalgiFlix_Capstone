require("dotenv").config()

const express = require("express")
const cors = require("cors") // Import the CORS module here
const app = express()

// Enable CORS for all routes
app.use(cors())

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
