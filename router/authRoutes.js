const express = require("express");
const router = express.Router();
const { login, logout } = require("../controller/authController");

// Route de connexion (utilisation de la méthode POST)
router.post("/login", login);

// Route de déconnexion (utilisation de la méthode GET)
router.get("/logout", logout);

module.exports = router;
