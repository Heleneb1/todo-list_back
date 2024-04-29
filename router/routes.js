const express = require("express");
const router = express.Router();

const taskRoutes = require("./taskRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const listRoutes = require("./listRoutes");

const authorization = require("../middleware/auth");

// Route racine
router.get('/', (req, res) => {
    res.send('Hello World, Welcome to my Todo API!')
});

// Routes pour les tâches avec autorisation requise
router.use("/tasks", authorization, taskRoutes);


router.use("/users", userRoutes);


router.use("/auth", authRoutes);

router.use("/lists",listRoutes );

module.exports = router;
