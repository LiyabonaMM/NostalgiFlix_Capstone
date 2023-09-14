require("dotenv").config()

const express = require("express")
const path = require("path") // Import the path module here
const cors = require("cors")
const app = express()

// Enable CORS for all routes
app.use(cors())

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Serve static files from the static directory
app.use(express.static(path.join(__dirname, "static")))

const userRoutes = require("./routes/userRoutes")
const movieRoutes = require("./routes/movieRoutes")

// API Endpoints
app.use("/api/users", userRoutes)
app.use("/api/movies", movieRoutes)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"))
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})
