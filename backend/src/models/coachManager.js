// Importing the AbstractManager class
const AbstractManager = require("./AbstractManager");

// Defining the coachManager class that extends AbstractManager
class coachManager extends AbstractManager {
  // Constructor initializes the class and sets the table name to "coach"
  constructor() {
    // Calling the constructor of the parent class (AbstractManager) with the table name
    super({ table: "coach" });
  }
}

// Exporting the coachManager class
module.exports = coachManager;
