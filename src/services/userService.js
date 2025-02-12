const bcrypt = require("bcrypt");
const { AppDataSource } = require("../ormconfig");
const User = require("../entities/UserEntity");

// Register Service
const userRegister = async ({user_name, email, password }, res) => {
  if (!user_name || !email || !password) {
    return res.status(400).json({ message: "Please fill all the required fields" });
  }

  const userRepository = AppDataSource.getRepository(User);

  // Check if the user already exists
  const existingUser = await userRepository.findOneBy({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email is already registered." });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save a new user
  const user = {user_name, email, password: hashedPassword };
  await userRepository.save(user);

  return res.status(201).json({ message: "User registered successfully." });
};

// Login Service
const userLogin = async ({ email, password }, res) => {
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const userRepository = AppDataSource.getRepository(User);

  // Find the user by email
  const user = await userRepository.findOneBy({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // Compare the provided password with the stored hash
  const isPasswordValid = await bcrypt.compare(password, user.password);   
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  return res.status(200).json({ message: "Login successful." });
};

module.exports = { userRegister, userLogin };
