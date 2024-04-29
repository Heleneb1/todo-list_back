const express = require("express");

const router = express.Router();

const { getOne, getAll, deleteOneById, updateOneById, addOneTask, addTaskToList, getTasksInList } = require("../controller/taskController");

router.get("/", getAll);
router.get("/list/:list_id", getTasksInList)
router.get("/:id", getOne);
router.post("/", addOneTask);
router.post("/addTaskToList/:list_id",addTaskToList)
router.put("/:id", updateOneById);
router.delete("/:id", deleteOneById);

module.exports = router;
