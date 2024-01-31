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

// Route to user
router.get("/user", verifyToken, userControllers.browse);
router.get("/user/:id", verifyToken, userControllers.read);
router.post("/user/", hashPassword, userControllers.add);
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

/* ************************************************************************* */

module.exports = router;
