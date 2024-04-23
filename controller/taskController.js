const { findOne, findAll, deleteOne, updateOne, createOne } = require("../model/taskModel");
const getOne = async (req, res) => {
    const userId = parseInt(req.params.id, 10);

    try {
        if (isNaN(userId)) {
            throw new Error();
        }
        const [user] = await findOne(userId);
        res.send(user);
    } catch (err) {
        res.sendStatus(500);
    }
};

const getAll = async (req, res) => {
    try {
        const items = await findAll();
        res.send(items);
    } catch {
        res.sendStatus(500);
    }
};

const addOneTask = async (req, res) => {
    try {
        const { title, isComplete, created, itemContent } = req.body;
        const result = await createOne({ title, isComplete, created, itemContent });
        res.status(201).send(result);
    } catch (err) {
        res.sendStatus(500);
    }
};

const updateOneById = async (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const { title, isComplete, created, itemContent } = req.body;

    try {
        if (isNaN(itemId)) {
            throw new Error();
        }
        const result = await updateOne(itemId, { title, isComplete, created, itemContent });
        res.send(result);
    } catch (err) {
        res.sendStatus(500);
    }
};

const deleteOneById = async (req, res) => { 
    const itemId = parseInt(req.params.id, 10);

    try {
        if (isNaN(itemId)) {
            throw new Error();
        }
        const result = await deleteOne(itemId);
        res.send(result
        );  
    }
    catch (err) {
        res.sendStatus(500);
    }
}


module.exports = { getOne, getAll, addOneTask, updateOneById, deleteOneById};

