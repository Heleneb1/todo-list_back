const { findOneList, findAllList,findAllListByUser, deleteOneList, updateOneList, createOneList } = require("../model/listModel");
const getOneList = async (req, res) => {
    const listId = parseInt(req.params.id, 10);

    try {
        if (isNaN(listId)) {
            throw new Error();
        }
        const [list] = await findOneList(listId);
        res.send(list);
    } catch (err) {
        res.sendStatus(500);
    }
};

const getAllLists = async (req, res) => {
    try {
        const lists = await findAllList();
        res.send(lists);
    } catch {
        res.sendStatus(500);
    }
};
const getAllListsByUser = async (req, res) => {
    const {user_id} = req.params;
    console.log(req.params);
    try {
        const lists = await findAllListByUser(user_id);
        // console.log("lists in controller", lists);
        res.send(lists); // Envoyer les listes récupérées
    } catch (err) {
        console.error(err);
        res.sendStatus(500); // Gérer l'erreur si elle se produit
    }
};

const addOneList = async (req, res) => {
    try {
        // Assurez-vous que l'utilisateur est authentifié et que vous avez accès à ses informations d'identification ou à son ID
        const userId = req.body.user_id; // Supposons que l'ID de l'utilisateur est accessible dans req.body.user_id
        console.log("userId in controller", userId);
        const { name } = req.body;
        
        // Ajoutez l'ID de l'utilisateur à la liste
        const result = await createOneList({ name }, userId); // Passer userId comme un paramètre distinct

        res.status(201).send(result);
    } catch (err) {
        res.sendStatus(500);
    }
};



const updateOneById = async (req, res) => {
    const listId = parseInt(req.params.id, 10);
    const {name } = req.body;

    try {
        if (isNaN(listId)) {
            throw new Error();
        }
        const result = await updateOneList(listId, {name });
        res.send(result);
    } catch (err) {
        res.sendStatus(500);
    }
};

const deleteOneById = async (req, res) => { 
    const listId = parseInt(req.params.id);

    try {
      
        const result = await deleteOneList(listId);
        res.send(result
        );  
    }
    catch (err) {
        res.sendStatus(500);
    }
}


module.exports = { getOneList, getAllLists,getAllListsByUser, addOneList, updateOneById, deleteOneById};

