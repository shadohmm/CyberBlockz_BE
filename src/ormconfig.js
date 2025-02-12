const { DataSource } = require("typeorm");
const User = require("./entities/UserEntity");
require("dotenv").config();

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3307,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME,
  synchronize: true, // Use only in development. Set to false in production.
  logging: true,
  entities: ["src/entities/**/*.js"],
});

module.exports = { AppDataSource };
