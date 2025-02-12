require("reflect-metadata");
const express = require("express");
const { AppDataSource } = require("./ormconfig");
const routes = require("./routes/index");
const cors = require('cors');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200', // Allow only your Angular app
  methods: 'GET,POST,PUT,DELETE', // Allow these HTTP methods
  allowedHeaders: 'Content-Type,Authorization' // Allow these headers
}));
// Routes
app.use("/api", routes);

// Initialize the database and start the server
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
