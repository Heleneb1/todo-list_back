const argon2 = require("argon2");

const hashingOption = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (plainPassword) => {
  return argon2.hash(plainPassword, hashingOption);
};

const verifyPassword = (plainPassword, hashedPassword) => {
  return argon2.verify(plainPassword, hashedPassword);
};


module.exports = { hashPassword, verifyPassword };
