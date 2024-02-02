// Importing the AbstractManager class
const AbstractManager = require("./AbstractManager");

// Defining the usergymManager class that extends AbstractManager
class usergymManager extends AbstractManager {
  // Constructor initializes the class and sets the table name to "user_gym"
  constructor() {
    // Calling the constructor of the parent class (AbstractManager) with the table name
    super({ table: "user_gym" });
  }

  async getAllUserGym() {
    const [rows] = await this.database.query(`
    SELECT 
      user.id AS user_id,
      user.firstname,
      user.lastname,
      user.email,
      user.hashed_password,
      user.genre,
      user.phone,
      user.is_admin,
      gym.id AS gym_id,
      gym.gym_name,
      gym.city,
      gym.consolidated_longitude,
      gym.consolidated_latitude,
      gym.description,
      user_gym.reservation_date,
      user_gym.reservation_heure
    FROM user_gym
    JOIN user ON user_gym.user_id = user.id
    JOIN gym ON user_gym.gym_id = gym.id
  `);
    return rows;
  }

  async postUserGym(reservationData) {
    const [response] = await this.database.query(
      `INSERT INTO user_gym (user_id, gym_id, reservation_date, reservation_heure) VALUES (?, ?, ?, ?)`,
      [
        reservationData.user_id,
        reservationData.gym_id,
        reservationData.reservation_date,
        reservationData.reservation_heure,
      ]
    );
    return response.affectedRows;
  }
}

// Exporting the user_gymManager class
module.exports = usergymManager;
