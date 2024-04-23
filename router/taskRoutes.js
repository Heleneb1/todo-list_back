const express = require("express");

const router = express.Router();

const { getOne, getAll, deleteOneById, updateOneById, addOneTask } = require("../controller/taskController");

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", addOneTask);
router.put("/:id", updateOneById);
router.delete("/:id", deleteOneById);

module.exports = router;
