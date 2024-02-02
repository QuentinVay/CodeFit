const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import auth services for security operations
const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./services/auth");

// Import itemControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");
const gymControllers = require("./controllers/gymControllers");
const coachControllers = require("./controllers/coachControllers");
const usergymControllers = require("./controllers/usergymControllers");

// Route to user
router.get("/user", userControllers.browse);
router.get("/user/:id", userControllers.read);
router.post("/user", hashPassword, userControllers.add);
router.post(
  "/user/login",
  userControllers.readByEmailAndPassToNext,
  verifyPassword
);
router.put("/user/:id", verifyToken, userControllers.edit);
router.delete("/user/:id", verifyToken, userControllers.destroy);

// Route to gym
router.get("/gym", gymControllers.browse);
router.get("/gym/:id", gymControllers.read);
router.post("/gym/", gymControllers.add);
router.put("/gym/:id", gymControllers.edit);
router.delete("/gym/:id", gymControllers.destroy);

// Route to coach
router.get("/coach", coachControllers.browse);
router.get("/coach/:id", coachControllers.read);
router.post("/coach/", coachControllers.add);
router.put("/coach/:id", coachControllers.edit);
router.delete("/coach/:id", coachControllers.destroy);

// Route to usergym
router.get("/user-gym", usergymControllers.browse);
router.get("/user-gym/:id", usergymControllers.read);
router.post("/user-gym", usergymControllers.add);
router.put("/user-gym/:id", usergymControllers.edit);
router.delete("/user-gym/:id", usergymControllers.destroy);

/* ************************************************************************* */

module.exports = router;
