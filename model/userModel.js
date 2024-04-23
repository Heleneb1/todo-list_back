const uuid = require('uuid');
const db = require("./db");

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
module.exports = { findOne, addOne, findByEmail };