const express = require('express');
const router = express.Router();
const multerConfig = require('../middleware/multer-config');

const { getOne, createOne, getAllUsers, getAvatar, insertAvatar, updateUserAvatar } = require("../controller/userController");

router.get("/:id", getOne);
router.post("/", createOne);
router.get("/", getAllUsers);
router.get("/:id/avatar", getAvatar);
router.post("/:id/avatar", multerConfig, insertAvatar);
router.put('/:id/updateAvatar', multerConfig, updateUserAvatar); // Utiliser upload pour multer
router.get('/:id/avatar', function (req, res) {
    const avatarPath = path.resolve(__dirname, './public/uploads');
    res.sendFile(avatarPath);
});

module.exports = router;
