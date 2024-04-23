const express = require("express");
const router = express.Router();

const taskRoutes = require("./taskRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");

const authorization = require("../middleware/auth");

// Route racine
router.get('/', (req, res) => {
    res.send('Hello World, Welcome to my Todo API!')
});

// Routes pour les tâches avec autorisation requise
router.use("/items", authorization, taskRoutes);


router.use("/users", userRoutes);


router.use("/auth", authRoutes);

module.exports = router;
