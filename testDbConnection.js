require("dotenv").config()

const { Sequelize } = require("sequelize")

// Utilize the environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.")
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error)
  })
