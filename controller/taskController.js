const { findOne, findAll,findAllTasksInList, deleteOne, updateOne, createOne,addedTaskToList } = require("../model/taskModel");
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
        const tasks = await findAll();
        res.send(tasks);
    } catch {
        res.sendStatus(500);
    }
};

const getTasksInList = async (req, res) => {
    const listId = req.params.list_id;
    try {
        const tasks = await findAllTasksInList(listId);
        res.send(tasks);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

const addOneTask = async (req, res) => {
    try {
        const { title, isComplete, created, taskContent } = req.body;
        const result = await createOne({ title, isComplete, created, taskContent });
        res.status(201).send(result);
    } catch (err) {
        res.sendStatus(500);
    }
};

const updateOneById = async (req, res) => {
    const taskId = req.params.id;
    const { title, isComplete, created, taskContent } = req.body;

    try {
        
        const result = await updateOne(taskId, { title, isComplete, created, taskContent });
        res.send(result);
    } catch (err) {
        res.sendStatus(500);
    }
};

const deleteOneById = async (req, res) => { 
    const taskId = req.params.id;

    try {
     
        const result = await deleteOne(taskId);
        res.send(result
        );  
    }
    catch (err) {
        res.sendStatus(500);
    }
}

const addTaskToList = async (req, res) => {
    const taskId = req.body.taskId; // Utiliser req.body.taskId pour récupérer taskId
    const listId = req.params.list_id;
    const { title, isComplete, created, taskContent } = req.body;

    try {
        // Ajouter la tâche à la liste
        const result = await addedTaskToList(listId, { title, isComplete, created, taskContent });
        console.log("Tâche ajoutée à la liste :", result);

        // Envoyer la réponse
        res.send(result);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};
module.exports = { getOne, getAll,getTasksInList, addOneTask, addTaskToList, updateOneById, deleteOneById};

