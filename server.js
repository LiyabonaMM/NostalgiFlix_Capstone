server.js // server.js
require("dotenv").config()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()

// Middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Credentials", "true")
  res.header("Access-Control-Allow-Methods", "*")
  res.header("Access-Control-Request-Methods", "*")
  res.header("Access-Control-Allow-Headers", "*")
  res.header("Access-Control-Expose-Headers", "Authorization")
  next()
})
app.use(express.json(), express.urlencoded({ extended: false }), cookieParser())

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
