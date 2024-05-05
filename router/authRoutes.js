const express = require("express");
const router = express.Router();
const { login, logout } = require("../controller/authController");
const authenticateToken = require('../middleware/authenticateToken'); // Importez le middleware d'authentification

// Route de connexion (utilisation de la méthode POST)
router.post("/login", login);

// Route de déconnexion (utilisation de la méthode GET)
router.get("/logout", authenticateToken, logout); // Utilisez le middleware d'authentification pour protéger cette route

module.exports = router;
