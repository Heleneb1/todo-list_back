const { findOne, addOne, findAllUsers, addAvatar, updateAvatar, getAvatarUrl } = require("../model/userModel");
const validateUser = require("../validator/userValidator");
const { hashPassword } = require("../helper/argonHelper");
const path = require('path');
const { json } = require("express");




const getAllUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    res.send(users);
  } catch {

    res.status(500).json({ message: "Une erreur est survenue" });
  }
};

const getOne = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    if (isNaN(userId)) {
      throw new Error();
    }
    const [user] = await findOne(userId);
    res.send(user);
    console.log("user", user);
  } catch (err) {
    res.sendStatus(500);
  }
};

const createOne = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const errors = validateUser(req.body);
    if (errors) {
      return res.status(401).send(errors);
    }
    const hashedPassword = await hashPassword(req.body.password);
    const result = await addOne({ ...req.body, password: hashedPassword });
    res.status(201).json({ message: "Utilisateur créé avec succès !" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Utilisateur créé avec succès !" });

  }
};
const getAvatar = async (req, res) => {
  const userId = req.params.id;

  const users = await getAvatarFileName(userId);
  console.log("users", users);

  if (!users || !users[0] || !users[0].avatar) {
    return res.status(404).send('Avatar not found');
  }
  console.log("users[0].avatar", users[0].avatar); // Utiliser users[0].avatar ici

  // Convertir le chemin de fichier en URL
  const avatarUrl = `http://localhost:5000/${users[0].avatar.replace(/\\/g, '/')}`;

  res.send(avatarUrl);
};


const insertAvatar = async (req, res) => {
  const userId = req.params.id;
  const avatarUrl = req.body.avatar;
  console.log(userId);
  try {
    const result = await addAvatar(userId, avatarUrl);
    res.send(result);
  } catch (err) {
    res.sendStatus(500);
  }
  console.log("insertAvatar", avatarUrl);
};

const updateUserAvatar = async (req, res) => {
  const userId = req.params.id;
  const avatarPath = req.file.path;
  console.log("avatarPath", avatarPath);
  console.log(userId);

  try {
    const result = await updateAvatar(userId, avatarPath);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
module.exports = { getOne, createOne, getAllUsers, getAvatar, insertAvatar, updateUserAvatar };
