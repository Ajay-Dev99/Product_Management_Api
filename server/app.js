const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const apiRouter = require("./Routes")
const cookieParser = require("cookie-parser")
const connectDB = require("./config/dbconfig")
require("dotenv").config()

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: true,
    credentials: true,
  })
)

// Database connection
connectDB()

app.use("/api", apiRouter)

// 404 Error handling
app.use((req, res, next) => {
  const error = new Error("Not found")
  error.status = 404
  next(error)
})

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error)
  res.status(error.status || 500).json({
    error: error.message,
  })
})

// Start server
const PORT = process.env.PORT || 4000
app.listen(PORT, (err) => {
  if (err) {
    console.error(err.message)
  } else {
    console.log(`Server started on port ${PORT}`)
  }
})
