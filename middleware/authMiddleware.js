const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (token) {
    try {
      // Vérifier et décoder le token JWT
      const decoded = jwt.verify(token, 'your_secret_key_here');
      // Le token est valide, vous pouvez accéder aux informations de l'utilisateur à partir de decoded
      req.user = decoded;
      next();
    } catch (err) {
      // Le token est invalide ou a expiré
      res.status(401).send('Invalid or expired token');
    }
  } else {
    // Aucun token trouvé dans les cookies
    res.status(401).send('No token found');
  }
};

module.exports = authMiddleware;
