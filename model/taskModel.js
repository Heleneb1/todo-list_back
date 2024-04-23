const db = require("./db");
const uuid = require('uuid')

const findOne = async (id) => {
    try {
        const [task] = await db.query("SELECT * FROM `items` WHERE id = ?", [id]);
        return task;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const findAll = async () => {
    try {
        const [items] = await db.query("SELECT * FROM `items`");
        return items;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const deleteOne = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM `items` WHERE id = ?", [id]);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const updateOne = async (id, updatedItem) => {
    try {
        const [result] = await db.query("UPDATE `items` SET ? WHERE id = ?", [updatedItem, id]);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const createOne = async (itemData) => {
    const { title, isComplete, created, itemContent } = itemData;
    try {
        if (!title) {
            throw new Error('Le titre est obligatoire');
        }
        const item = {
            title,
            isComplete: isComplete || false,
            created: created || new Date(),
            itemContent: itemContent || '',
            id: uuid.v4()
        };
        const result = await db.query("INSERT INTO `items` SET ?", item);
        item.id = result.insertId;
        return item;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = { findOne, findAll, deleteOne, updateOne, createOne };
