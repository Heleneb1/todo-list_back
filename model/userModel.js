const uuid = require('uuid');
const db = require("./db");
const multer = require('multer');
const upload = multer();

// const findAllUsers = async () => {
//   try {
//     const [users] = await db.query("SELECT * FROM `users`");
//     return users;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };
const findAllUsers = async () => {
  try {
    const [users] = await db.query("SELECT * FROM `users`");
    console.log(users);
    return users;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const findOne = async (id) => {
  try {
    const [user] = await db.query("select * from `users` where id = ?", [id]);
    return user;
  } catch (err) {
    console.error(err);
  }
};
const findByEmail = async (email) => {
  try {
    const [user] = await db.query("select * from `users` where email = ?", [
      email,
    ]);
    return user;
  } catch (err) {
    console.error(err);
  }
};
const addOne = async (user) => {
  try {
    const { firstname, lastname, email, password } = user;
    const userId = uuid.v4();
    const [result] = await db.query(
      "insert into `users` (id, firstname, lastname, email, password) values (?,?,?,?,?)",
      [userId, firstname, lastname, email, password]
    );
    return { id: userId, firstname, lastname, email };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const addAvatar = async (userId, avatar) => {
  try {
    const [result] = await db.query("update `users` set avatar = ? where id = ?", [
      avatar,
      userId,
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const updateAvatar = async (userId, avatarPath) => {
  console.log(avatarPath);
  try {
    const [result] = await db.query("UPDATE users SET avatar = ? WHERE id = ?", [
      avatarPath,
      userId,
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
getAvatarFileName = async (userId) => {
  console.log("userId", userId);
  try {
    const [user] = await db.query("SELECT avatar FROM users WHERE id = ?", [userId]);
    console.log("user", user);
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const getAvatarUrl = async (id) => {
  try {
    const [user] = await db.query("SELECT * FROM `users` WHERE id = ?", [id]);
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
module.exports = { findOne, addOne, findAllUsers, addAvatar, updateAvatar, getAvatarFileName, getAvatarUrl, findByEmail };
