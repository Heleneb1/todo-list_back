const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); // Pas de jeton, accès non autorisé

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Jeton invalide
    req.user = user;
    next(); // Autorisation accordée, passez à la prochaine fonction middleware ou à la route
  });
};

module.exports = authenticateToken;
