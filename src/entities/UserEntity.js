const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
  name: "User",
  tableName: "users", // Optional: Specify the table name
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    user_name: {
      type: "varchar",
    },
    email: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "varchar",
    },
  },
});

module.exports = User;
