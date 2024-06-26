const db = require("./db");
const uuid = require('uuid')

const findOne = async (id) => {
    try {
        const [task] = await db.query("SELECT * FROM `tasks` WHERE id = ?", [id]);
        return task;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const findAll = async () => {
    try {
        const [tasks] = await db.query("SELECT * FROM `tasks`");
        return tasks;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const findAllTasksInList = async (list_id) => {
    console.log("list_id", list_id);
    try {
        const [tasks] = await db.query("SELECT * FROM `tasks`WHERE list_id = ?", [list_id]);
        return tasks;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const deleteOne = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM `tasks` WHERE id = ?", [id]);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const updateOne = async (id, updatedtask) => {
    // Apply formatting to the `created` date if it exists
    if (updatedtask.created) {
        updatedtask.created = new Date(updatedtask.created).toISOString().slice(0, 19).replace('T', ' ');
    }

    try {
        // Execute the update query
        const [result] = await db.query("UPDATE tasks SET ? WHERE id = ?", [updatedtask, id]);
        return result;
    } catch (err) {
        console.error('Update failed:', err);
        throw err;
    }
};
const addedTaskToList = async (listId, taskData) => {
    try {
        const { title, isComplete, created } = taskData;

        // Vérifier le titre de la tâche 
        if (!title) {
            throw new Error('Le titre de la tâche est obligatoire');
        }

        // Générer un nouvel ID pour la tâche
        const taskId = uuid.v4();

        // Convertir la date en format DATETIME
        const createdDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        // Insérer la tâche dans la liste avec le nouvel ID
        const [result] = await db.query("INSERT INTO `tasks` SET ?", {
            id: taskId,
            title,
            isComplete: isComplete || false,
            created: createdDate,
            list_id: listId
        });

        // Créez un objet tâche avec les détails fournis
        const task = {
            id: taskId,
            title,
            isComplete: isComplete || false,
            created: createdDate,

        };

        return task;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const createOne = async (taskData) => {
    const { title, isComplete, created } = taskData;
    try {
        if (!title) {
            throw new Error('Le titre est obligatoire');
        }
        // Convertir la date en format DATETIME
        const createdDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const task = {
            title,
            isComplete: isComplete || false,
            created: createdDate,
            id: uuid.v4()
        };
        const result = await db.query("INSERT INTO `tasks` SET ?", task);
        task.id = result.insertId;
        return task;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = { findOne, findAll, findAllTasksInList, deleteOne, updateOne, addedTaskToList, createOne };
