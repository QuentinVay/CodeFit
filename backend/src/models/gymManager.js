// Importing the AbstractManager class
const AbstractManager = require("./AbstractManager");

// Defining the gymManager class that extends AbstractManager
class gymManager extends AbstractManager {
  // Constructor initializes the class and sets the table name to "gym"
  constructor() {
    // Calling the constructor of the parent class (AbstractManager) with the table name
    super({ table: "gym" });
  }
}

// Exporting the gymManager class
module.exports = gymManager;
