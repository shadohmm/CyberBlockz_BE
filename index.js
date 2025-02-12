// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// const mariadb = require('mariadb');

// // Create a connection to the MariaDB server
// const pool = mariadb.createPool({
//   host: 'localhost', // Host where MariaDB is running
//   user: 'root', // Your MariaDB username
//   password: 'root', // Your MariaDB password
//   database: 'localdb', // Your database name
//   connectionLimit: 5, // Optional: Number of connections in the pool
// });

// // async function connectToDB() {
// //   let conn;
// //   try {
// //     conn = await pool.getConnection();
// //     console.log("Connected to MariaDB!");
// //     // Run a test query
// //     const rows = await conn.query("SELECT 1 as test");
// //     console.log(rows); // Output: [ { test: 1 } ]
// //   } catch (err) {
// //     console.error("Error connecting to MariaDB:", err);
// //   } finally {
// //     if (conn) conn.end(); // Close the connection
// //   }
// // }

// // connectToDB();
// async function executeQuery(query, params = []) {
//     let conn;
//     try {
//       conn = await pool.getConnection();
//       const result = await conn.query(query, params);
//       return result;
//     } catch (err) {
//       console.error(err);
//       throw err;
//     } finally {
//       if (conn) conn.end();
//     }
//   }
  
//   // CRUD Operations
  
//   // 1. Create
//   async function createUser(login, password) {
//     const query = "INSERT INTO user (login, password) VALUES (?, ?)";
//     const result = await executeQuery(query, [login, password]);
//     console.log("User Created:", result.insertId);
//   }
  
//   // 2. Read
//   async function readUsers() {
//     const query = "SELECT * FROM users";
//     const users = await executeQuery(query);
//     console.log("Users:", users);
//   }
  
//   // 3. Update
//   async function updateUser(id, name, email, age) {
//     const query = "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?";
//     const result = await executeQuery(query, [name, email, age, id]);
//     console.log("Rows Updated:", result.affectedRows);
//   }
  
//   // 4. Delete
//   async function deleteUser(id) {
//     const query = "DELETE FROM users WHERE id = ?";
//     const result = await executeQuery(query, [id]);
//     console.log("Rows Deleted:", result.affectedRows);
//   }
  
//   // Test CRUD Operations
//   (async () => {
//     // Create Users
//     // await createUser("Alice", "alice@example.com");
//     // await createUser("Bob", "bob@example.com");
  
//     // Read Users
//     // await readUsers();
  
//     // // Update a User
//     // await updateUser(1, "Alice Updated", "alice.updated@example.com", 26);
  
//     // // Read Users Again
//     // await readUsers();
  
//     // // Delete a User
//     // await deleteUser(2);
  
//     // // Read Users Again
//     // await readUsers();
// })();

// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

require('reflect-metadata');
const { createConnection, getRepository } = require('typeorm');
const User = require('./src/entities/user');

async function main() {
  // Establish connection with MariaDB
  const connection = await createConnection();

  // Get the user repository
  const userRepository = getRepository(User);

  // CREATE: Insert a new user
  const newUser = userRepository.create({
    name: 'John Doe',
    email: 'johndoe@example.com',
  });
  await userRepository.save(newUser);
  console.log('User created:', newUser);

  // READ: Find all users
  const users = await userRepository.find();
  console.log('All users:', users);

  // UPDATE: Find a user and update it
  const userToUpdate = await userRepository.findOne({ where: { name: 'John Doe' } });
  if (userToUpdate) {
    userToUpdate.email = 'newemail@example.com';
    await userRepository.save(userToUpdate);
    console.log('User updated:', userToUpdate);
  }

  // DELETE: Delete a user by id
  const userToDelete = await userRepository.findOne({ where: { name: 'John Doe' } });
  if (userToDelete) {
    await userRepository.remove(userToDelete);
    console.log('User deleted');
  }

  // Close the connection
  await connection.close();
}

main().catch((error) => console.log(error));
