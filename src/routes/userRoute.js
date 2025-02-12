// const express = require("express");
// const bcrypt = require("bcrypt");
// const { AppDataSource } = require("../ormconfig");
// const User = require("../entities/UserEntity");
const {userLogin, userRegister} = require("../services/userService")
// const router = express.Router();

// Register API
// router.post("/register", async (req, res) => {
const register = async(req,res) => {
  try {
    await userRegister(req.body, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// login api
// router.post("/login", async(req,res)=>{
const login = async(req,res) => {
  try {
    await userLogin(req.body, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  register,
  login
}
