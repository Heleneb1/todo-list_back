const db = require("./db");
const uuid = require('uuid')

const findOneList = async (id) => {
    try {
        const [task] = await db.query("SELECT * FROM `lists` WHERE id = ?", [id]);
        return task;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const findAllList = async () => {
    try {
        const [lists] = await db.query("SELECT * FROM `lists`");
        return lists;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
const findAllListByUser = async (userId) => {
    try {
        const [lists] = await db.query("SELECT * FROM `lists` WHERE user_id = ?", [userId]);
        console.log(lists);
        return lists;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
const deleteOneList = async (id) => {
    try {
        const [result] = await db.query("DELETE FROM `lists` WHERE id = ?", [id]);
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};


// const updateOneList = async (id, updatedList) => {
//     try {
//         const [result] = await db.query("UPDATE `lists` SET ? WHERE id = ?", [updatedList, id]);
//         return result;
//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// };
const updateOneList = async (id, updatedList) => {
    try {
        // Récupérer la liste existante depuis la base de données
        const existingList = await db.query("SELECT * FROM `lists` WHERE id = ?", [id]);

        // Vérifier si la liste existe
        if (existingList.length === 0) {
            throw new Error("La liste n'existe pas.");
        }

        // Ajouter les nouveaux éléments à la liste existante
        const updatedItems = [...existingList[0].items, ...updatedList.items];

        // Mettre à jour la liste avec les nouveaux éléments
        const [result] = await db.query("UPDATE `lists` SET items = ? WHERE id = ?", [updatedItems, id]);

        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
//TODO : Modifier la fonction createOneList pour qu'elle prenne en compte l'ID de l'utilisateur

const createOneList = async (listData, userId) => {
    const { name, listContent } = listData; // Déstructurez listContent
    try {
        // Vérifier si le nom de la liste est fourni
        if (!name) {
            throw new Error('Le titre est obligatoire');
        }
        console.log(userId);
        // Vérifier si l'utilisateur existe
        const existingUser = await db.query("SELECT * FROM `users` WHERE id = ?", [userId]);
        if (existingUser.length === 0) {
            throw new Error("L'utilisateur n'existe pas.");
        }
        console.log(existingUser);
        // Générer un UUID pour l'ID de la liste
        const listId = uuid.v4();
        const user_id = userId;
        console.log(user_id);
        // Insérer la liste avec l'ID de l'utilisateur dans la table `lists`
        const result = await db.query("INSERT INTO `lists` SET id = ?, name = ?, user_id = ?, listContent = ?", [listId, name, user_id, listContent]);

        // Retourner les détails de la liste créée
        return {
            id: listId,
            name,
            user_id: user_id,
            listContent// Utilisez user_id au lieu de userId
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = { findOneList, findAllList, findAllListByUser, deleteOneList, updateOneList, createOneList };
