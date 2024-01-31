// Importing the AbstractManager class
const AbstractManager = require("./AbstractManager");

// Defining the UserManager class that extends AbstractManager
class UserManager extends AbstractManager {
  // Constructor initializes the class and sets the table name to "charging_station"
  constructor() {
    // Calling the constructor of the parent class (AbstractManager) with the table name
    super({ table: "user" });
  }

  async readAllUser() {
    // Performing a database query to select all records from the charging station table
    const [rows] = await this.database.query(
      `select id , firstname, lastname, email, genre, phone, is_admin from ${this.table}`
    );
    // Returning all rows
    return rows;
  }

  async readUser(id) {
    // Performing a database query to select a record with the given ID
    const [row] = await this.database.query(
      `select id , firstname, lastname, email, hashed_password, genre, phone, is_admin from ${this.table} where id = ?`,
      [id]
    );
    // Returning the first row (assuming there is only one result)
    return row[0];
  }

  async readByEmail(email) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );
    return rows[0];
  }
}

// Exporting the UserManager class
module.exports = UserManager;
