const express = require("express");

const router = express.Router();

const { getOneList, getAllLists,getAllListsByUser, addOneList, updateOneById, deleteOneById } = require("../controller/listController");

router.get("/", getAllLists);
router.get("/user/:user_id", getAllListsByUser);
router.get("/:id", getOneList);
router.post("/user/:userId", addOneList);
router.put("/:id", updateOneById);
router.delete("/:id", deleteOneById);

module.exports = router;
